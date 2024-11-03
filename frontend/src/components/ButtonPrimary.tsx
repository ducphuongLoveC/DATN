import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';

interface ButtonPrimaryProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  customVariant?: 'outlined' | 'primary';
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  customVariant = 'primary',
  ...props
}) => {
  const theme = useTheme();

  let sxes = {

    padding: 'var(--medium-p) 50px',
    ...(props.sx || {}),
  };

  switch (customVariant) {
    case 'outlined':
      sxes = {
        ...sxes,
        color: 'var(--color-primary)',
        border: `1px solid ${theme.palette.text.primary}`,
        background: 'transparent',
      };
      break;
    case 'primary':
      sxes = {
        ...sxes,
        color: 'white',
        background: 'var(--color-primary)',
      };
      break;
    default:
      sxes = { ...sxes };
  }

  return (
    <Button {...props} sx={sxes}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;
