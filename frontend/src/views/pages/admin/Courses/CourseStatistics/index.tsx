import { Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TabsCustom from '@/components/TabsCustom';
import HeaderTitle from '../../Title';
import CourseDetail from './CourseDetail';
import { useQuery } from '@tanstack/react-query';
import { getCourseStatistics } from '@/api/courseApi';
import StudentList from './StudentList';

const CourseStatistics: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: cousrse, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseStatistics(id || ''),
    enabled: !!id,
  });

  if (isLoadingCourse) return <div>Loading...</div>;

  return (
    <Box>
      <HeaderTitle des="Thông kê chi tiết về cụ thể của khóa học" onClick={() => navigate(-1)} titleButton="Quay lại" />
      <Box component={Paper}>
        <TabsCustom
          labels={['Thông tin khóa học', 'Học viên tham gia']}
          contents={[<CourseDetail course={cousrse} />, <StudentList users={cousrse.enrolled_users} />]}
          onChange={() => {}}
        />
      </Box>
    </Box>
  );
};

export default CourseStatistics;
