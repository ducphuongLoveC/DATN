import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

// ui
import { useTheme } from '@mui/material';
import { Box, Grid, CardMedia, styled, Typography } from '@mui/material';

// api
import { getCoursesProgressWithUser } from '@/api/userApi';

// my pj

import { RootState } from '@/store/reducer';
import WrapperCard from '../Home/WrapperCard';
import Progress from '@/components/Progress';
import { Link } from 'react-router-dom';

const CustomCardMedia = styled(CardMedia)({
  height: '160px',
  overflow: 'hidden',
  objectFit: 'cover',
});

const MyCourses: React.FC = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const theme = useTheme();
  const { data: coursesWithProgress, isLoading } = useQuery({
    queryKey: ['coursesWithProgress'],
    queryFn: () => getCoursesProgressWithUser(user._id),
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <Box mt={3}>
      <Typography variant="h2">Khóa học của tôi</Typography>
      <Typography my={2} variant="body1">
        Các khóa học bạn đăng ký sẽ được hiện thị ở đây
      </Typography>

      <Grid container spacing={2}>
        {coursesWithProgress.courses.map((c: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/learning/${c._id}`}>
              <WrapperCard>
                <CustomCardMedia image={c.thumbnail} />
                <Box
                  sx={{
                    padding: 1,
                    backgroundColor: theme.palette.background.paper2,
                    height: '140px',
                  }}
                >
                  <Typography variant="h4" mb={1}>
                    {c.title}
                  </Typography>

                  <Typography variant="h5" mt={1}>
                    Hoàn thành chương: {`${c.completedModules} / ${c.totalModules}`}{' '}
                  </Typography>
                  <Typography variant="h5" mt={1}>
                    Hoàn thành bài học: {` ${c.completedResources} / ${c.totalResources}`}{' '}
                  </Typography>

                  <Progress sx={{ mt: 3 }} textProgress={false} value={c.progress} />
                </Box>
              </WrapperCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default MyCourses;
