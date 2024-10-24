import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';

interface InputPrimaryProps extends Omit<TextFieldProps, 'variant'> {
  placeholder?: string;
  width?: string | number; // Thêm thuộc tính width để điều chỉnh độ rộng
  height?: string | number; // Thêm thuộc tính height để điều chỉnh chiều cao
}

const InputPrimary: React.FC<InputPrimaryProps> = ({ ...props }) => {
  const theme = useTheme();

  const sxes = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.primary,
      },
      backgroundColor: theme.palette.background.paper,
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.primary,
      '&.Mui-focused': {
        color: theme.palette.text.primary,
      },
    },
    ...(props.sx || {}), // Kết hợp với các prop sx khác nếu có
  };

  return <TextField fullWidth variant="outlined" {...props} sx={sxes} />;
};

export default InputPrimary;
