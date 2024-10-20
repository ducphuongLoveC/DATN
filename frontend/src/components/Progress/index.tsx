import React from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ProgressProps extends LinearProgressProps {
  width: number;
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value, width, ...rest }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: width, mr: 1 }}>
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
      <Typography variant="caption" color="white" mr={1}>
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  );
};

export default Progress;
