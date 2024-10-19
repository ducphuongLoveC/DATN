import { Box, Typography, LinearProgress, Grid } from '@mui/material';
import StarRatings from 'react-star-ratings';

interface RatingPreviewProps {
  ratingCounts: number[];
}

export const RatingPreview: React.FC<RatingPreviewProps> = ({
  ratingCounts = [10, 20, 30, 40, 50],
}) => {
  const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);
  const averageRating =
    ratingCounts.reduce((sum, count, index) => sum + count * (index + 1), 0) /
    totalRatings;

  return (
    <Box mt='var(--medium-space)'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h3"
          component="span"
          sx={{ fontWeight: 'bold', mr: 2 }}
        >
          {averageRating.toFixed(1)}
        </Typography>
        <Box>
          <StarRatings
            rating={averageRating}
            starRatedColor="#FFA41C"
            numberOfStars={5}
            starDimension="24px"
            starSpacing="2px"
          />
          <Typography variant="body2" color="text.secondary">
            {totalRatings} tổng số đánh giá
          </Typography>
        </Box>
      </Box>
      <Box>
        {ratingCounts.map((count, index) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={index}
            sx={{ mb: 1 }}
          >
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary">
                {index + 1} sao
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                variant="determinate"
                value={(count / totalRatings) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary" align="right">
                {count}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default RatingPreview;
