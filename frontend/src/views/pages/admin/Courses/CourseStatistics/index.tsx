import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourseStatistics } from '@/api/courseApi';
import HeaderTitle from '../../Title';
import TabsCustom from '@/components/TabsCustom';
import StudentList from './StudentList';
import CourseDetail from './CourseDetail';
import useDebounce from '@/hooks/useDebounce';

const CourseStatistics: React.FC = () => {
  const [params, setParams] = useState({
    search: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Debounce the search parameter before making an API call
  const debouncedSearch = useDebounce(params.search, 500);

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', id, debouncedSearch],
    queryFn: () => getCourseStatistics(id || '', { search: debouncedSearch }),
    enabled: !!id,
  });

  if (isLoadingCourse) return <div>Loading...</div>;

  return (
    <Box>
      <HeaderTitle des="Thông kê chi tiết về cụ thể của khóa học" onClick={() => navigate(-1)} titleButton="Quay lại" />
      <Box component={Paper}>
        <TabsCustom
          labels={['Học viên tham gia', 'Thông tin khóa học']}
          contents={[
            <StudentList
              valueSearch={debouncedSearch}
              onSearch={(search) => setParams((prev) => ({ ...prev, search }))}
              users={course?.enrolled_users}
            />,
            <CourseDetail course={course} />,
          ]}
          onChange={() => {}}
        />
      </Box>
    </Box>
  );
};

export default CourseStatistics;
