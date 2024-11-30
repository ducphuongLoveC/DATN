import { Box, Grid, Skeleton } from '@mui/material';

const CourseSkeleton: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }} mt={2}>
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="text" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseSkeleton;
