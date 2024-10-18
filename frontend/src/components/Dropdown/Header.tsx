import { Typography } from '@mui/material';
import React from 'react';

interface ImageHeaderProps {
  head?: string;
  hExtend?: React.ReactNode;
}

const Header: React.FC<ImageHeaderProps> = ({ head, hExtend }) => {
  return (
    <>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: 'var(--head-font-size)',
          marginBottom: '10px',
        }}
      >
        {head}
      </Typography>
      {hExtend}
    </>
  );
};

export default Header;
