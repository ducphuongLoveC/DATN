import { Course } from '@/interfaces/course';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { Star, School, AccessTime, People, Timeline } from '@mui/icons-material';

// Styled components
const CourseThumbnail = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
});

const BoxCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const HighlightBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 12px ${theme.palette.action.hover}`,
  padding: theme.spacing(3),
}));

// Component definition
interface CourseDetailProps {
  course: any;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  const theme = useTheme();
  const calculateTotalDuration = (course: Course): string => {
    const totalDuration = course?.modules.reduce(
      (moduleAcc, module) =>
        moduleAcc + module.resources.reduce((resourceAcc, resource) => resourceAcc + resource.duration, 0),
      0
    );
    return moment.utc(totalDuration * 1000).format('HH:mm:ss');
  };

  const calculateTotalResources = (course: Course): number => {
    return course?.modules.reduce((moduleAcc, module) => moduleAcc + module.resources.length, 0);
  };

  return (
    <Grid container spacing={4}>
      {/* Thumbnail and general information */}
      <Grid item xs={12} md={4.8}>
        <HighlightBox>
          <CourseThumbnail src={typeof course?.thumbnail === 'string' ? course.thumbnail : ''} />
          <Box p={2}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              {course?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
              dangerouslySetInnerHTML={{ __html: course?.description }}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Giá gốc:</strong> {course?.original_price} đ
            </Typography>
            <Typography variant="body1" color="primary" sx={{ mt: 1, fontWeight: 700 }}>
              <strong>Giá khuyến mãi:</strong> {course?.sale_price} đ
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Loại: </strong>
              {course?.isFree ? 'Miễn phí' : 'Tính phí'}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Cung cấp chứng chỉ: </strong>
              {course?.has_certificate ? 'Có' : 'Không'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Trình độ: </strong>
              {course?.level}
            </Typography>
          </Box>
        </HighlightBox>
      </Grid>

      {/* Course details */}
      <Grid item xs={12} md={7.2}>
        <HighlightBox>
          <BoxCenter>
            <StyledTypography>
              <AccessTime sx={{ mr: 1, color: theme.palette.primary.main }} />
              Tổng thời gian của khóa học:
            </StyledTypography>
            <DetailValue>{calculateTotalDuration(course)}</DetailValue>
          </BoxCenter>

          <BoxCenter>
            <StyledTypography>
              <School sx={{ mr: 1, color: theme.palette.secondary.main }} />
              Số lượng chương học:
            </StyledTypography>
            <DetailValue>{course?.modules.length}</DetailValue>
          </BoxCenter>

          <BoxCenter>
            <StyledTypography>
              <Star sx={{ mr: 1, color: '#fbc02d' }} />
              Số lượng tài liệu học:
            </StyledTypography>
            <DetailValue>{calculateTotalResources(course)}</DetailValue>
          </BoxCenter>

          <BoxCenter>
            <StyledTypography>
              <People sx={{ mr: 1, color: theme.palette.info.main }} />
              Tổng số học viên tham gia:
            </StyledTypography>
            <DetailValue>{course?.enrollment_count}</DetailValue>
          </BoxCenter>

          <BoxCenter>
            <StyledTypography>
              <Timeline sx={{ mr: 1, color: theme.palette.primary.main }} />
              Tổng số giờ học viên đã học:
            </StyledTypography>
            <DetailValue>{moment.utc(course?.total_learning_seconds * 1000).format('HH:mm:ss')}</DetailValue>
          </BoxCenter>
        </HighlightBox>
      </Grid>
    </Grid>
  );
};

export default CourseDetail;
