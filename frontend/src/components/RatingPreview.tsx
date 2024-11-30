import { Box, Typography, LinearProgress, Grid, Button, TextField, Alert } from '@mui/material';
import StarRatings from 'react-star-ratings';
import { useState } from 'react';

interface RatingPreviewProps {
  user_id?: string;
  comments: any;
  ratingCounts: number[];
  mode: 'view' | 'edit';
  onChange?: (newRating: number, newComment: string) => void;
}

export const RatingPreview: React.FC<RatingPreviewProps> = ({
  user_id,
  comments,
  ratingCounts,
  mode = 'view',
  onChange,
}) => {
  const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);

  let averageRating = 0;
  if (totalRatings > 0) {
    averageRating = ratingCounts.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalRatings;
  }

  const [comment, setComment] = useState<any>('');

  const [selectedRating, setSelectedRating] = useState(averageRating);

  const handleRatingChange = (newRating: number) => {
    setSelectedRating(newRating);
  };

  const handleSubmit = () => {
    if (onChange) {
      onChange(selectedRating, comment);
    }
  };

  return (
    <Box mt="var(--medium-space)">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', mr: 2 }}>
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
          <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
            <Grid item xs={2}>
              <Typography variant="body2" color="text.secondary">
                {index + 1} sao
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                variant="determinate"
                value={count === 0 ? 0 : (count / totalRatings) * 100}
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

      <Box mt={2} py={3} borderRadius={2}>
        <Typography mb={2} variant="body2" color="text.secondary">
          Người dùng đánh giá:
        </Typography>
        {comments.length > 0 ? (
          comments.map((c: any) => (
            <Box
              key={c._id}
              display={'flex'}
              flexDirection={'column'}
              mb={2}
              p={2}
              borderRadius={2}
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                boxShadow: 2,
                '&:hover': { boxShadow: 5 },
              }}
            >
              <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                <Typography variant="h6" fontWeight="bold">
                  {c.user.name} {user_id === c.user._id && '( bạn )'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(c.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                {c.comment}
              </Typography>
              <StarRatings
                rating={c.stars}
                starRatedColor="#FFA41C"
                numberOfStars={5}
                starDimension="24px"
                starSpacing="2px"
              />
            </Box>
          ))
        ) : (
          <Typography>Không có người dùng đánh giá</Typography>
        )}
      </Box>

      {/* Chế độ chỉnh sửa */}
      {mode === 'edit' && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Chọn số sao đánh giá:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <StarRatings
              rating={selectedRating}
              starRatedColor="#FFA41C"
              numberOfStars={5}
              starDimension="40px"
              starSpacing="5px"
              changeRating={handleRatingChange}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Nhập suy nghĩ của bạn"
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{
                minHeight: 120,
                fontSize: '16px',
              }}
              variant="outlined"
            />
            <Alert severity="info">Vui lòng thận trọng trước khi đánh giá. Sau khi đánh giá không thể sửa</Alert>
            <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleSubmit}>
              Gửi đánh giá
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RatingPreview;
