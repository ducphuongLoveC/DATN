import { useState } from 'react';

// ui
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  styled,
} from '@mui/material';

//my pj
import AverageRating from '@/components/AverageRating';
import Module from '@/components/Module';
import ButtonPrimary from '@/components/ButtonPrimary';

//icon
import DoneIcon from '@mui/icons-material/Done';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const LearningOutcome = [
  { id: 1, title: 'Hiểu được các khái niệm cơ bản và nền tảng của ngành IT' },
  { id: 2, title: 'Nắm vững các kiến thức cơ bản về lập trình web' },
  { id: 3, title: 'Biết cách phát triển tư duy logic khi lập trình' },
  { id: 4, title: 'Tìm hiểu các công cụ và ngôn ngữ lập trình phổ biến' },
  {
    id: 5,
    title: 'Hiểu được quy trình phát triển phần mềm và các giai đoạn chính',
  },
  { id: 6, title: 'Học cách giải quyết vấn đề thông qua các bài tập thực tế' },
  { id: 7, title: 'Nắm được kiến thức về hệ thống và mạng máy tính' },
  { id: 8, title: 'Chuẩn bị tốt cho các khóa học nâng cao về lập trình' },
  { id: 9, title: 'Hiểu biết về bảo mật cơ bản và an toàn thông tin' },
  { id: 10, title: 'Biết cách làm việc với cơ sở dữ liệu và truy vấn SQL' },
  { id: 11, title: 'Phát triển kỹ năng làm việc nhóm trong dự án phần mềm' },
  { id: 12, title: 'Xây dựng giao diện người dùng thân thiện với HTML và CSS' },
  { id: 13, title: 'Hiểu rõ cách thức hoạt động của máy tính và hệ điều hành' },
  { id: 14, title: 'Làm quen với Git và quản lý phiên bản mã nguồn' },
  { id: 15, title: 'Tìm hiểu về các phương pháp kiểm thử phần mềm cơ bản' },
  { id: 16, title: 'Nắm được nguyên lý lập trình hướng đối tượng' },
  { id: 17, title: 'Hiểu biết về các dịch vụ đám mây và triển khai ứng dụng' },
  { id: 18, title: 'Xây dựng ứng dụng web đơn giản với JavaScript' },
  { id: 19, title: 'Biết cách tối ưu hóa hiệu suất của trang web' },
  { id: 20, title: 'Hiểu về các mô hình thiết kế phổ biến trong lập trình' },
];

const LearningLists = [
  {
    title: '1: Giới thiệu về JavaScript',
    children: [
      { title: 'JavaScript là gì?', path: '1', time: 600 },
      { title: 'Lịch sử của JavaScript', path: '2', time: 600 },
    ],
  },
  {
    title: '2: Biến và kiểu dữ liệu',
    children: [
      { title: 'Khai báo biến', path: '3', time: 900 },
      { title: 'Các kiểu dữ liệu cơ bản', path: '4', time: 600 },
      { title: 'Toán tử trong JavaScript', path: '5', time: 600 },
    ],
  },
  {
    title: '3: Cấu trúc điều khiển',
    children: [
      { title: 'Câu lệnh điều kiện', path: '6', time: 600 },
      { title: 'Vòng lặp', path: '', time: 600 },
    ],
  },
  {
    title: '4: Hàm trong JavaScript',
    children: [
      { title: 'Khai báo và sử dụng hàm', path: '7', time: 600 },
      { title: 'Tham số và giá trị trả về', path: '8', time: 600 },
      { title: 'Hàm mũi tên', path: '', time: 600 },
    ],
  },
  {
    title: '5: Mảng và đối tượng',
    children: [
      { title: 'Làm việc với mảng', path: '9' },
      { title: 'Làm việc với đối tượng', path: '10' },
    ],
  },
  {
    title: '6: Lập trình hướng đối tượng',
    children: [
      { title: 'Class và object', path: '', time: 600 },
      { title: 'Kế thừa', path: '', time: 600 },
    ],
  },
  {
    title: '7: Xử lý bất đồng bộ',
    children: [
      { title: 'Callback', path: '', time: 600 },
      { title: 'Promises', path: '', time: 600 },
      { title: 'Async/Await', path: '', time: 600 },
    ],
  },
  {
    title: '8: Làm việc với DOM',
    children: [
      { title: 'Chọn và thao tác với các phần tử DOM', path: '', time: 600 },
      { title: 'Sự kiện DOM', path: '', time: 600 },
    ],
  },
  {
    title: '9: AJAX và Fetch API',
    children: [
      { title: 'Giới thiệu về AJAX', path: '', time: 600 },
      { title: 'Sử dụng Fetch API', path: '', time: 600 },
    ],
  },
  {
    title: '10: Công cụ và thư viện',
    children: [
      { title: 'Sử dụng npm', path: '', time: 600 },
      { title: 'Các thư viện phổ biến', path: '', time: 600 },
    ],
  },
];

const BoxPreviewVideo = styled(Box)(({}) => ({
  position: 'relative',
  cursor: 'pointer',
  '&::after': {
    content: '" "',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 'var(--main-border-radius)',
    zIndex: 1,
  },
}));

const CourseDetail: React.FC = () => {
  const [isShowMoreLearningOutCome, setIsShowMoreLearningOutCome] =
    useState(false);
  const [expandedIndexs, setExpandedIndexs] = useState<number[]>([0]);

  const handleToggleExpanded = (index: number) => {
    setExpandedIndexs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleToggleExpandedAll = () => {
    if (LearningLists.length == expandedIndexs.length) {
      setExpandedIndexs([]);
    } else {
      setExpandedIndexs(LearningLists.map((_, index) => index));
    }
  };

  const handleToggleShowMoreLearningOutCome = () => {
    setIsShowMoreLearningOutCome((prev) => !prev);
  };

  return (
    <Box mt={'var(--large-space)'}>
      <Grid
        container
        spacing={{ xs: 0, sm: 13 }}
        width={'100%'}
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            md: 'row',
          },
          px: {
            xs: '20px',
            md: '0',
          },
        }}
      >
        <Grid item xs={12} md={8} xl={8}>
          <Typography variant="h1">Kiến Thức Nhập Môn IT</Typography>
          <Typography variant="body1" mt={'var(--medium-space)'}>
            Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem
            các videos tại khóa này trước nhé.
          </Typography>
          <AverageRating totalRatings={25} totalUserRate={5} totalStars={5} />
          <Typography
            fontWeight={'var(--bold-font-weight)'}
            mt={'var(--medium-space)'}
          >
            Đăng bởi admin
          </Typography>
          <Typography variant="h3" mt={'var(--medium-space)'}>
            Bạn sẽ học được những gì?
          </Typography>
          <Box>
            <Grid
              container
              sx={{
                overflow: 'hidden',
                maxHeight: isShowMoreLearningOutCome ? 'none' : '400px',
              }}
              spacing={1}
              mt={'var(--medium-space)'}
              p={2}
              border="1px solid #d1d7dc"
            >
              {LearningOutcome.map((l) => (
                <Grid item xs={6} key={l.id} display={'flex'}>
                  <DoneIcon fontSize="inherit" />
                  <Typography ml={1}>{l.title}</Typography>
                </Grid>
              ))}
            </Grid>

            <Button onClick={handleToggleShowMoreLearningOutCome}>
              {isShowMoreLearningOutCome ? 'Ẩn bớt' : 'Xem thêm'}
            </Button>
          </Box>
          <Typography variant="h3" mt={'var(--medium-space)'}>
            Nội dung khóa học
          </Typography>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="body1" mt={'var(--medium-space)'}>
              4 chương • 12 bài học • Thời lượng 03 giờ 26 phút
            </Typography>
            <Button onClick={handleToggleExpandedAll}>
              {expandedIndexs.length == LearningLists.length
                ? 'Đóng tất cả'
                : 'Mở tất cả'}
            </Button>
          </Box>
          <Box
            mt={'var(--medium-space)'}
            sx={{
              border: '1px solid #d1d7dc',
            }}
          >
            {LearningLists.map((list, index) => (
              <Module
                onClick={() => handleToggleExpanded(index)}
                expanded={expandedIndexs.includes(index)}
                styleM="two"
                key={index}
                title={list.title}
                items={list.children}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Box position={'sticky'} top="97px">
            <BoxPreviewVideo>
              <CardMedia
                component="img"
                image="https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg"
                sx={{
                  width: '100%',
                  borderRadius: 'var(--main-border-radius)',
                }}
              />
              <PlayCircleIcon
                sx={{
                  position: 'absolute',
                  fontSize: 'var(--large-icon)',
                  color: 'white',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                Xem giới thiệu
              </Typography>
            </BoxPreviewVideo>
            <Grid
              container
              spacing={2} 
              sx={{
                px: {
                  sm: 0,
                  md: 3,
                },
              }}
            >
              <Grid item xs={12} mt={'var(--medium-space)'}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="h2">
                      {Number(120000).toLocaleString('vi-VN')} VND
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      {Number(120000).toLocaleString('vi-VN')} VND
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <ButtonPrimary
                  fullWidth
                >
                  Mua ngay
                </ButtonPrimary>
              </Grid>

              <Grid item xs={12}>
                <Typography>Khóa học bao gồm:</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetail;
