import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface ButtonPrimaryProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        color: 'white',
        background: 'var(--color-primary)',
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
