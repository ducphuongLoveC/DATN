import React from 'react';
import Header from '../MainLayout/Header';
import { Box } from '@mui/material';
import Footer from '../MainLayout/Footer';

import { useTheme } from '@mui/material';
interface BasicLayoutProps {
  children: React.ReactNode;
}
const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Header />
      <Box
        sx={{
          margin: 'auto',
          width: {
            sm: '100%',
            md: '90%',
          },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
export default BasicLayout;
