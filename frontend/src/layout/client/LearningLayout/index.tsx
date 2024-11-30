import { Box } from '@mui/material';
import Header from './Header';

interface LearningLayoutProps {
  children: React.ReactNode;
}
const LearningLayout: React.FC<LearningLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default LearningLayout;
