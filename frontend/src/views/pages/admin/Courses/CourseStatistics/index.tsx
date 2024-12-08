import { Box, Paper } from '@mui/material';
import TabsCustom from '@/components/TabsCustom';
import HeaderTitle from '../../Title';
const CourseStatistics: React.FC = () => {
  return (
    <Box>
      <HeaderTitle des='Thông kê chi tiết về cụ thể của khóa học' />
      <Box component={Paper}>
        <TabsCustom labels={['Thông tin khóa học', 'Học viên tham gia', 'Biểu đồ học']} contents={[<Box />]} onChange={() => {}} />
      </Box>
    </Box>
  );
};
export default CourseStatistics;
