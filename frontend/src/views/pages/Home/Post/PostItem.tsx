import { Box, Typography, styled, useTheme, CardMedia } from '@mui/material';
import WrapperCard from '../WrapperCard';

const CustomCardMedia = styled(CardMedia)({
  width: '100%',
  height: '160px',
  overflow: 'hidden',
  objectFit: 'cover',
});

interface PostItemProps {
  thumbnail: string;
  title: string;
  postUser: string;
}
const PostItem: React.FC<PostItemProps> = ({ thumbnail, title, postUser }) => {
  const theme = useTheme();

  return (
    <WrapperCard>
      <CustomCardMedia image={thumbnail} />
      <Box
        sx={{ padding: 3, backgroundColor: theme.palette.background.paper2 }}
      >
        <Typography mb={1} variant="body1">
          Đăng bởi {postUser}
        </Typography>
        <Typography variant="h4">{title}</Typography>
      </Box>
    </WrapperCard>
  );
};
export default PostItem;
