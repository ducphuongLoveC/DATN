import { Box, Typography } from '@mui/material';
import Course from './Course/Course';
// import Post from './Post/Post';

const Home: React.FC = () => {
  return (
    <Box>
      <Typography variant="h2">Các khóa học để bạn bắt đầu</Typography>
      <Typography mt={1} variant="body1">
        Khám phá các khóa học do các chuyên gia giàu kinh nghiệm trong ngành giảng dạy.
      </Typography>
      <Course />
      {/* <Typography mt={5} variant="h2">
        Bài viết nổi bật
      </Typography>
      <Typography mt={1} variant="body1">
        Khám phá các khóa học do các chuyên gia giàu kinh nghiệm trong ngành giảng dạy.
      </Typography>
      <Post /> */}
    </Box>
  );
};
export default Home;
