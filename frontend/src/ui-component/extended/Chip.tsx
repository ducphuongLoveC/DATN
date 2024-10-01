import React from 'react';
import MuiChip from '@mui/material/Chip';
import { alpha, useTheme, SxProps, Theme } from '@mui/material/styles';

// Define types for props
interface ChipProps {
  chipcolor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'orange'
    | 'warning';
  variant?: 'contained' | 'outlined';
  disabled?: boolean;
  sx?: SxProps<Theme>;
  [key: string]: any; // Allows additional props like label, onClick, etc.
}

// ==============================|| CHIP ||============================== //

const Chip: React.FC<ChipProps> = ({
  chipcolor = 'primary',
  disabled = false,
  sx = {},
  variant = 'contained',
  ...others
}) => {
  const theme = useTheme();

  const defaultSX: SxProps<Theme> = {
    color: 'primary.main',
    bgcolor: 'primary.light',
    ':hover': {
      color: 'primary.light',
      bgcolor: 'primary.dark',
    },
  };

  let outlineSX: SxProps<Theme> = {
    color: 'primary.main',
    bgcolor: 'transparent',
    border: '1px solid',
    borderColor: 'primary.main',
    ':hover': {
      color: 'primary.light',
      bgcolor: 'primary.dark',
    },
  };

  switch (chipcolor) {
    case 'secondary':
      outlineSX =
        variant === 'outlined'
          ? {
              color: 'secondary.main',
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: 'secondary.main',
              ':hover': {
                color: 'secondary.main',
                bgcolor: 'secondary.light',
              },
            }
          : {
              color: 'secondary.main',
              bgcolor: 'secondary.light',
              ':hover': {
                color: 'secondary.light',
                bgcolor: 'secondary.main',
              },
            };
      break;
    case 'success':
      outlineSX =
        variant === 'outlined'
          ? {
              color: 'success.dark',
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: 'success.dark',
              ':hover': {
                color: 'success.dark',
                bgcolor: alpha(theme.palette.success.light, 0.6),
              },
            }
          : {
              color: 'success.dark',
              bgcolor: alpha(theme.palette.success.light, 0.6),
              ':hover': {
                color: 'success.light',
                bgcolor: 'success.dark',
              },
            };
      break;
    case 'error':
      outlineSX =
        variant === 'outlined'
          ? {
              color: 'error.main',
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: 'error.main',
              ':hover': {
                color: 'error.dark',
                bgcolor: 'error.light',
              },
            }
          : {
              color: 'error.dark',
              bgcolor: alpha(theme.palette.error.light, 0.6),
              ':hover': {
                color: 'error.light',
                bgcolor: 'error.dark',
              },
            };
      break;
    case 'orange':
      outlineSX =
        variant === 'outlined'
          ? {
              color: 'orange.dark',
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: 'orange.main',
              ':hover': {
                color: 'orange.dark',
                bgcolor: 'orange.light',
              },
            }
          : {
              color: 'orange.dark',
              bgcolor: 'orange.light',
              ':hover': {
                color: 'orange.light',
                bgcolor: 'orange.dark',
              },
            };
      break;
    case 'warning':
      outlineSX =
        variant === 'outlined'
          ? {
              color: 'warning.dark',
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: 'warning.dark',
              ':hover': {
                color: 'warning.dark',
                bgcolor: 'warning.light',
              },
            }
          : {
              color: 'warning.dark',
              bgcolor: 'warning.light',
              ':hover': {
                color: 'warning.light',
                bgcolor: 'warning.dark',
              },
            };
      break;
    default:
      break;
  }

  if (disabled) {
    outlineSX =
      variant === 'outlined'
        ? {
            color: 'grey.500',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'grey.500',
            ':hover': {
              color: 'grey.500',
              bgcolor: 'transparent',
            },
          }
        : {
            color: 'grey.500',
            bgcolor: 'grey.50',
            ':hover': {
              color: 'grey.500',
              bgcolor: 'grey.50',
            },
          };
  }

  const SX = variant === 'outlined' ? outlineSX : defaultSX;
  return (
    <MuiChip
      sx={{
        ...SX,
        ...sx,
      }}
      {...others}
    />
  );
};

export default Chip;
