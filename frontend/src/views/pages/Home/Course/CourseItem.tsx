import { styled, CardMedia, Box, Typography, useTheme } from '@mui/material';
// pj
import AverageRating from '@/components/AverageRating';
import WrapperCard from '../WrapperCard';
import { Link } from 'react-router-dom';
const CustomCardMedia = styled(CardMedia)({
  height: '160px',
  overflow: 'hidden',
  objectFit: 'cover',
});

interface CourseItemProp {
  thumbnail: string;
  title: string;
  postUser: string;
  price: string | number;
  salePrice: number;
  totalUserRate: number;
  totalStars: number;
  stars: number;
  to: string;
  isFree: boolean;
}

const CourseItem: React.FC<CourseItemProp> = ({
  thumbnail,
  title,
  postUser,
  price,
  salePrice,
  totalUserRate,
  totalStars,
  stars,
  to,
  isFree,
}) => {
  const theme = useTheme();

  return (
    <Link to={to}>
      <WrapperCard>
        <CustomCardMedia image={thumbnail} />
        <Box
          sx={{
            padding: 1,
            backgroundColor: theme.palette.background.paper2,
            height: '140px',
          }}
        >
          <Typography variant="h4" mb={1}>
            {title}
          </Typography>
          <Typography variant="body1">Đăng bởi {postUser}</Typography>

          <AverageRating totalStars={totalStars} totalUserRate={totalUserRate} stars={stars} />

          {isFree ? (
            <Typography variant="h3" color="#980000">
              Miễn phí
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <Typography variant="h3" color="#980000">
                {salePrice.toLocaleString('vi-VN')} VND
              </Typography>
              <Typography variant="caption" sx={{ textDecoration: 'line-through', marginLeft: 1 }}>
                {price.toLocaleString('vi-VN')} VND
              </Typography>
            </Box>
          )}
        </Box>
      </WrapperCard>
    </Link>
  );
};

export default CourseItem;
