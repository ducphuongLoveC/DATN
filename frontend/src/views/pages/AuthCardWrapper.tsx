import React from 'react';
import Box from '@mui/material/Box';

// project import
import MainCard from '@/ui-component/cards/MainCard';

// Define the props interface
interface AuthCardWrapperProps {
  children: React.ReactNode;
  [key: string]: any;
}

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper: React.FC<AuthCardWrapperProps> = ({
  children,
  ...other
}) => (
  <MainCard
    sx={{
      maxWidth: {
        xs: 400,
        lg: 475,
      },
      margin: {
        xs: 2.5,
        md: 3,
      },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      },
    }}
    content={false}
    {...other}
  >
    <Box>{children}</Box>
  </MainCard>
);

export default AuthCardWrapper;
