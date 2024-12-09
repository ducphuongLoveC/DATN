import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useTheme } from '@mui/material';
import { Box, Typography, Button } from '@mui/material';
import TabsCustom from '@/components/TabsCustom';
import UserInfo from './UserInfo';
import CoursesInfo from './CoursesInfo';
import HeaderTitle from '../../Title';
const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching user details for userId:', id);

        // Gọi API lấy thông tin người dùng
        const userResponse = await axiosInstance.get(`/api/user/${id}`);
        console.log('User response:', userResponse);
        if (userResponse.data.success) {
          setUser(userResponse.data.data);
        } else {
          setUserError('Không tìm thấy thông tin người dùng.');
        }

        // Gọi API lấy danh sách khóa học
        const coursesResponse = await axiosInstance.get(`/api/user/${id}/courses`);
        console.log('Courses response:', coursesResponse);

        // Kiểm tra nếu khóa học rỗng, không trả về lỗi 404
        if (coursesResponse.status === 200) {
          setCourses(coursesResponse.data.courses || []); // Lấy khóa học từ response
          setCoursesError(null); // Đảm bảo không hiển thị lỗi nếu không có khóa học
        } else {
          setCourses([]); // Đảm bảo trả về mảng rỗng nếu không có khóa học
          setCoursesError('Tài khoản này chưa đăng ký khóa học nào.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setUserError('Lỗi khi lấy thông tin người dùng.');
        setCoursesError('Lỗi khi lấy danh sách khóa học.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;

  if (userError || coursesError) {
    return (
      <Box>
        {userError && <Typography color="error">{userError}</Typography>}
        {coursesError && <Typography color="error">{coursesError}</Typography>}
        <Button variant="contained" onClick={() => window.history.back()} sx={{ marginTop: '20px' }}>
          Quay lại
        </Button>
      </Box>
    );
  }

  const userInfoContent = user ? (
    <UserInfo user={user} />
  ) : (
    <Typography color="error">Không tìm thấy thông tin người dùng</Typography>
  );
  const coursesInfoContent =
    courses.length > 0 ? (
      <CoursesInfo courses={courses} />
    ) : (
      <Typography>Tài khoản này chưa đăng ký khóa học nào.</Typography>
    );

  return (
    <Box>
      <HeaderTitle des="Đây là trang chi tiết người dùng" onClick={() => navigate(-1)} titleButton="Quay lại" />

      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <TabsCustom
          onChange={() => {}}
          labels={['Thông tin người dùng', 'Khóa học tham gia']}
          contents={[userInfoContent, coursesInfoContent]}
        />
      </Box>
    </Box>
  );
};

export default UserDetails;
