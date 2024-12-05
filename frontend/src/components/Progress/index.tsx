import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ProgressProps extends LinearProgressProps {
  colorText?: string;
  value: number;
  sx?: object; // Thêm hỗ trợ custom styles
  textProgress?: boolean;
}

const Progress: React.FC<ProgressProps> = ({ colorText, textProgress = true, value, sx, ...rest }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box sx={{ flexGrow: 1, mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          {...rest}
          sx={{
            height: '5px',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            '& .MuiLinearProgress-bar': {
              background: 'var(--color-primary)',
              borderRadius: '5px',
            },
          }}
        />
      </Box>
      {textProgress && (
        <Typography variant="caption" color={colorText || 'white'} mr={1}>
          {`${Math.round(value)}%`}
        </Typography>
      )}
    </Box>
  );
};

export default Progress;
