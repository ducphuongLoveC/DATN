import React, { useState } from 'react';
import { Box, styled } from '@mui/material';

// my pj
import BackgroundOverlay from '../BackgroundOverlay';
const Wrapper = styled(Box)<{ open: boolean; placement: string }>(
  ({ open, placement, theme }) => ({
    position: 'fixed',
    top: '0',
    right: placement === 'right' ? '0' : 'auto',
    left: placement === 'right' ? 'auto' : '0',
    zIndex: 9999,
    transform:
      placement === 'right'
        ? open
          ? 'translateX(0)'
          : 'translateX(100%)'
        : open
          ? 'translateX(0)'
          : 'translateX(-100%)',
    transition: 'transform 0.2s ease-in-out',
    width: '500px',
    height: '100vh',
    background: theme.palette.background.paper,
    overflow: 'auto',
  })
);

interface PlacementToggleProps {
  placement: 'left' | 'right';
  Connect: (connect: () => void) => React.ReactNode;
  children: React.ReactNode;
}

const PlacementToggle: React.FC<PlacementToggleProps> = React.memo(
  ({ placement, Connect, children }) => {
    const [isOpenWrapper, setIsOpenWrapper] = useState<boolean>(false);
    const handleToggleWrapper = () => {
      window.requestAnimationFrame(() => {
        setIsOpenWrapper(!isOpenWrapper);
      });
    };

    return (
      <Box>
        {/* control */}
        {Connect(handleToggleWrapper)}

        <BackgroundOverlay onClick={handleToggleWrapper} open={isOpenWrapper} />
        <Wrapper open={isOpenWrapper} placement={placement}>
          {children}
        </Wrapper>
      </Box>
    );
  }
);
export default PlacementToggle
