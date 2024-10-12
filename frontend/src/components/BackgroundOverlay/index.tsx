import React from 'react';
import { styled, Box, BoxProps } from '@mui/material';

const BackgroundOverlayStyle = styled(Box)<{ open: boolean }>(({ open }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  opacity: open ? 1 : 0,
  transition: 'opacity 0.2s ease-in-out',
  pointerEvents: open ? 'auto' : 'none',
  willChange: 'opacity',
}));

interface BackgroundOverlayProps extends BoxProps {
  open: boolean;
}
const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({
  open,
  ...otherProps
}) => {
  return <BackgroundOverlayStyle open={open} {...otherProps} />;
};
export default BackgroundOverlay;
