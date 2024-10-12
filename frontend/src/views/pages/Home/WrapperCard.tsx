import { Box } from '@mui/material';

interface WrapperCardProps {
  children: React.ReactNode;
}
const WrapperCard: React.FC<WrapperCardProps> = ({ children }) => {
  return (
    <Box
    sx={{
      width: '100%',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
      },
      borderRadius: 'var(--main-border-radius)',
      cursor: 'pointer',
      overflow: 'hidden', // Add this to ensure children don't overflow the rounded corners
    }}
  >
    {children}
  </Box>
  
  );
};
export default WrapperCard;
