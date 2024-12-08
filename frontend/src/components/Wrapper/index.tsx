import { Box, BoxProps } from '@mui/material';

const Wrapper: React.FC<BoxProps> = ({ children, sx, ...props }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      fontSize: '16px',
      backgroundColor: 'white',
      padding: '20px',
      fontWeight: 'lighter',
      marginTop: '12px',
      borderRadius: '10px',
      boxShadow: '0 -4px 32px #0003',
      ...sx, // Merge sx từ bên ngoài
    }}
    {...props}
  >
    {children}
  </Box>
);

export default Wrapper;
