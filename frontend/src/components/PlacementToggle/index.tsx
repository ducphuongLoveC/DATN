import React, { useEffect, useState } from 'react';
import { Box, styled, Button } from '@mui/material';
// Icon
import CloseIcon from '@mui/icons-material/Close';
// My project components
import BackgroundOverlay from '../BackgroundOverlay';

// Wrapper with support for 'top', 'bottom', 'left', and 'right' placements
const Wrapper = styled(Box)<{ open: boolean; placement: 'left' | 'right' | 'top' | 'bottom' }>(({
  open,
  placement,
  theme,
}) => {
  const getPositionStyles = () => {
    switch (placement) {
      case 'left':
        return {
          width: '100%', // Default width
          left: '0',
          right: 'auto',
          top: '0',
          bottom: '0',
          [theme.breakpoints.up('sm')]: {
            width: '500px',
          },
          [theme.breakpoints.up('md')]: {
            width: '600px',
          },
          [theme.breakpoints.up('lg')]: {
            width: '700px',
          },
          height: '100vh',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        };
      case 'right':
        return {
          width: '100%', // Default width
          right: '0',
          left: 'auto',
          top: '0',
          bottom: '0',
          [theme.breakpoints.up('sm')]: {
            width: '500px',
          },
          [theme.breakpoints.up('md')]: {
            width: '600px',
          },
          [theme.breakpoints.up('lg')]: {
            width: '700px',
          },
          height: '100vh',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        };
      case 'top':
        return {
          top: '0',
          bottom: 'auto',
          left: '0',
          right: '0',
          width: '100vw',
          height: '500px',
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
        };
      case 'bottom':
        return {
          bottom: '0',
          top: 'auto',
          left: '0',
          right: '0',
          width: '100vw',
          height: '500px',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
        };
      default:
        return {};
    }
  };

  return {
    position: 'fixed',
    zIndex: 9999,
    transition: 'transform 0.2s ease-in-out',
    background: theme.palette.background.paper,
    overflow: 'auto',
    ...getPositionStyles(),
  };
});

interface PlacementToggleProps {
  placement: 'left' | 'right' | 'top' | 'bottom';
  Connect: (connect: () => void) => React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean
}

const PlacementToggle: React.FC<PlacementToggleProps> = React.memo(({ placement, Connect, children, defaultOpen=false }) => {
  const [isOpenWrapper, setIsOpenWrapper] = useState<boolean>(defaultOpen);
  const handleToggleWrapper = () => {
    window.requestAnimationFrame(() => {
      setIsOpenWrapper(!isOpenWrapper);
    });
  };

  useEffect(()=> {
    setIsOpenWrapper(defaultOpen);
  },[defaultOpen])

  return (
    <Box position="relative">
      {Connect(handleToggleWrapper)}
      <BackgroundOverlay onClick={handleToggleWrapper} open={isOpenWrapper} />
      <Wrapper open={isOpenWrapper} placement={placement}  >
        {children}
        <Button onClick={handleToggleWrapper} sx={{ position: 'absolute', top: '0', right: '0' }}>
          <CloseIcon />
        </Button>
      </Wrapper>
    </Box>
  );
});

export default PlacementToggle;
