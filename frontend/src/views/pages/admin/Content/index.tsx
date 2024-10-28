import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Pagination,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material';

const PostManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const [posts, setPosts] = useState([
    {
      id: 1,
      title:
        'Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày.',
      description:
        'Khi chưa có kinh nghiệm xây dựng và chỉ có 15 ngày, mình đã hoàn thành dự án với rất nhiều thử thách.',
      author: 'Admin',
      authorAvatar: '/path/to/avatar.jpg',
      category: 'Bài viết mới',
      date: '27-09-2024',
      views: 157,
    },
    {
      id: 2,
      title:
        'Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày.',
      description:
        'Khi chưa có kinh nghiệm xây dựng và chỉ có 15 ngày, mình đã hoàn thành dự án với rất nhiều thử thách.',
      author: 'Kazuo Uchida',
      authorAvatar: '/path/to/avatar.jpg',
      category: 'Bài viết mới',
      date: '27-09-2024',
      views: 157,
    },
  ]);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleConfirmClick = (post) => {
    setSelectedPost(post);
    setOpenConfirm(true);
  };

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setOpenDelete(false);
    setSelectedPost(null);
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
    alert(`Bạn đã xác nhận bài viết: ${selectedPost.title}`);
  };

  const handleDelete = () => {
    setPosts(posts.filter((post) => post.id !== selectedPost.id));
    setOpenDelete(false);
    alert(`Bài viết ${selectedPost.title} đã bị xóa.`);
  };

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-p-6 tw-min-h-screen">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h1 className="tw-text-xl tw-font-semibold">Quản lý bài viết</h1>
        <button className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4">
          Bảng điều khiển
        </button>
      </div>

      <div
        style={{ background: theme.palette.background.default }}
        className="tw-bg-gray-100 tw-py-4 tw-px-6 tw-flex tw-justify-between tw-items-center tw-mb-6 tw-shadow-md"
      >
        <p>
          Chức năng "Thêm bài viết" cho phép người dùng quản lý hệ thống danh
          mục và thêm mới bài viết vào cơ sở dữ liệu.
        </p>
        <button className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4">
          Thêm bài viết
        </button>
      </div>

      <Grid container spacing={2}>
        {posts
          .slice((page - 1) * postsPerPage, page * postsPerPage)
          .map((post) => (
            <Grid item xs={12} sm={6} key={post.id}>
              <Card
                style={{ background: theme.palette.background.default }}
                className="tw-shadow-md tw-border tw-flex"
              >
                <CardContent className="tw-flex-grow">
                  <Typography
                    variant="h6"
                    component="div"
                    className="tw-font-semibold tw-mb-1"
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="tw-mb-2 tw-text-gray-600 tw-w-3/4"
                  >
                    {post.description}
                  </Typography>
                  <div className="tw-flex tw-items-center tw-mb-2">
                    <Avatar
                      src={post.authorAvatar}
                      alt={post.author}
                      className="tw-mr-2"
                    />
                    <Typography variant="body2" className="tw-text-gray-600">
                      {post.author}
                    </Typography>
                  </div>
                  <div className="tw-grid md:tw-grid-flow-col tw-row-span-3">
                    <div className="tw-grid tw-grid-flow-row tw-row-span-2 tw-items-center tw-pr-4">
                      {post.author === 'Admin' ? (
                        <Button
                          variant="contained"
                          color="primary"
                          className="tw-bg-purple-500 hover:tw-bg-purple-600 tw-w-full tw-text-white tw-mb-2"
                        >
                          Xem bài viết
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="secondary"
                            className="tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white tw-mr-2"
                            onClick={() => handleConfirmClick(post)}
                          >
                            Xác nhận bài viết
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            className="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white"
                            onClick={() => handleDeleteClick(post)}
                          >
                            Xóa bài viết
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="tw-w-full">
                      <Grid
                        className=" tw-ml-5 tw-grid tw-row-span-4"
                        container
                        spacing={3}
                      >
                        <Grid item xs={30}>
                          <Typography
                            variant="body2"
                            className="tw-text-gray-600"
                          >
                            Lượt xem: {post.views}
                          </Typography>
                        </Grid>
                        <Grid item xs={30}>
                          <Typography
                            variant="body2"
                            className="tw-text-gray-600"
                          >
                            Danh mục: {post.category}
                          </Typography>
                        </Grid>
                        <Grid item xs={30}>
                          <Typography
                            variant="body2"
                            className="tw-text-gray-600"
                          >
                            Ngày tạo: {post.date}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <div className="tw-flex tw-justify-center tw-mt-6">
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          className="tw-mt-4"
        />
      </div>
      <Dialog open={openConfirm} onClose={handleClose}>
        <DialogTitle>Xác nhận bài viết</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xác nhận bài viết này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="tw-text-gray-500">
            Hủy
          </Button>
          <Button
            onClick={handleConfirm}
            color="secondary"
            className="tw-bg-purple-500 hover:tw-bg-purple-600 tw-text-white"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle>Xóa bài viết</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa bài viết "{selectedPost?.title}" không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="tw-text-gray-500">
            Hủy
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            className="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostManagement;
