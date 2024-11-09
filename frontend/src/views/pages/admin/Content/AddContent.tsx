import * as React from 'react';

import { useState, ChangeEvent } from 'react';
import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const AddPost: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  return (
    <Box
      maxWidth="md"
      sx={{
        mx: 'auto',
        p: 3,
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h3">Thêm bài viết</Typography>
          <Button variant="outlined">Bảng điều khiển</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Tiêu đề bài viết</Typography>
            <TextField
              placeholder="Thêm tiêu đề..."
              variant="outlined"
              fullWidth
              margin="dense"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Nội dung bài viết</Typography>
            <TextField
              placeholder="viết nội dung ở đây"
              variant="outlined"
              fullWidth
              margin="dense"
              multiline
              rows={10}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Danh mục bài viết</Typography>
            <TextField
              select
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder="Chọn danh mục"
            >
              <MenuItem value="">
                <em>Chọn danh mục</em>
              </MenuItem>
              <MenuItem value="category1">Danh mục 1</MenuItem>
              <MenuItem value="category2">Danh mục 2</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Tác giả</Typography>
            <TextField
              select
              value={author}
              onChange={handleAuthorChange}
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder="Chọn tác giả"
            >
              <MenuItem value="">
                <em>Chọn tác giả</em>
              </MenuItem>
              <MenuItem value="author1">Tác giả 1</MenuItem>
              <MenuItem value="author2">Tác giả 2</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="inherit">
            Hủy
          </Button>
          <Button variant="contained" color="primary">
            Thêm bài viết
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddPost;
