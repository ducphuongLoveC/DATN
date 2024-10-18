import { Box, Grid } from '@mui/material';

import PostItem from './PostItem';

const Post: React.FC = () => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <PostItem
            thumbnail="https://vnskills.edu.vn/wp-content/uploads/2023/01/hoc-lap-trinh-front-end.jpg"
            title="10 bước học lập trình Front End hiệu quả và chi tiết nhất"
            postUser="người dùng 1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <PostItem
            thumbnail="https://vnskills.edu.vn/wp-content/uploads/2023/01/hoc-lap-trinh-front-end.jpg"
            title="10 bước học lập trình Front End hiệu quả và chi tiết nhất"
            postUser="người dùng 1"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <PostItem
            thumbnail="https://vnskills.edu.vn/wp-content/uploads/2023/01/hoc-lap-trinh-front-end.jpg"
            title="10 bước học lập trình Front End hiệu quả và chi tiết nhất"
            postUser="người dùng 1"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <PostItem
            thumbnail="https://vnskills.edu.vn/wp-content/uploads/2023/01/hoc-lap-trinh-front-end.jpg"
            title="10 bước học lập trình Front End hiệu quả và chi tiết nhất"
            postUser="người dùng 1"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <PostItem
            thumbnail="https://vnskills.edu.vn/wp-content/uploads/2023/01/hoc-lap-trinh-front-end.jpg"
            title="10 bước học lập trình Front End hiệu quả và chi tiết nhất"
            postUser="người dùng 1"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Post;
