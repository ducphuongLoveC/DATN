import { styled, CardMedia, Box, Typography, useTheme } from '@mui/material';
// pj
import AverageRating from '@/components/AverageRating';
import WrapperCard from '../WrapperCard';
const CustomCardMedia = styled(CardMedia)({
  height: '160px',
  overflow: 'hidden',
  objectFit: 'cover',
});

interface CourseItemProp {
  thumbnail: string;
  title: string;
  postUser: string;
  totalRatings: number;
  price: string | number;
  salePrice: number;
  totalUserRate: number;
  totalStars: number;
}

const CourseItem: React.FC<CourseItemProp> = ({
  thumbnail,
  title,
  postUser,
  price,
  salePrice,
  totalRatings,
  totalUserRate,
  totalStars,
}) => {
  const theme = useTheme();
  return (
    <WrapperCard>
      <CustomCardMedia image={thumbnail} />
      <Box
        sx={{ padding: 3, backgroundColor: theme.palette.background.paper2 }}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">Đăng bởi {postUser}</Typography>

        <AverageRating
          totalRatings={totalRatings}
          totalUserRate={totalUserRate}
          totalStars={totalStars}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <Typography variant="h3" color="#980000">
            {salePrice.toLocaleString('vi-VN')} VND
          </Typography>
          <Typography
            variant="caption"
            sx={{ textDecoration: 'line-through', marginLeft: 1 }}
          >
            {price.toLocaleString('vi-VN')} VND
          </Typography>
        </Box>
      </Box>
    </WrapperCard>
  );
};

export default CourseItem;
