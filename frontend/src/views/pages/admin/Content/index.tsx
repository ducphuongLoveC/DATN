import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';

interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  category: string;
  date: string;
  views: number;
}

const PostManagement: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const postsPerPage = 6;

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày.',
      description: 'Khi chưa có kinh nghiệm xây dựng và chỉ có 15 ngày, mình đã hoàn thành dự án với rất nhiều thử thách.',
      author: 'Admin',
      authorAvatar: '/path/to/avatar.jpg',
      category: 'Bài viết mới',
      date: '27-09-2024',
      views: 157,
    },
    // Additional posts can go here
  ]);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleConfirmClick = (post: Post) => {
    setSelectedPost(post);
    setOpenConfirm(true);
  };

  const handleDeleteClick = (post: Post) => {
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
    alert(`Bạn đã xác nhận bài viết: ${selectedPost?.title}`);
  };

  const handleDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter((post) => post.id !== selectedPost.id));
    }
    setOpenDelete(false);
    alert(`Bài viết ${selectedPost?.title} đã bị xóa.`);
  };

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-p-6 tw-min-h-screen">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h1 className="tw-text-xl tw-font-semibold">Quản lý bài viết</h1>
        <Button variant="contained" color="primary" className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4">
          Bảng điều khiển
        </Button>
      </div>

      <div style={{ background: theme.palette.background.default }} className="tw-py-4 tw-px-6 tw-flex tw-justify-between tw-items-center tw-mb-6 tw-shadow-md">
        <p>Chức năng "Thêm bài viết" cho phép người dùng quản lý hệ thống danh mục và thêm mới bài viết vào cơ sở dữ liệu.</p>
        <Button variant="contained" color="primary" className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4">
          Thêm bài viết
        </Button>
      </div>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
        {posts.slice((page - 1) * postsPerPage, page * postsPerPage).map((post) => (
          <div key={post.id} className="tw-bg-white tw-p-4 tw-shadow-md tw-border tw-flex">
            <div className="tw-flex-grow">
              <h2 className="tw-font-semibold tw-text-base tw-mb-1">{post.title}</h2>
              <p className="tw-text-gray-600 tw-text-xs tw-w-[80%] tw-mb-2">{post.description}</p>
              <div className="tw-flex tw-items-center tw-mb-2">
                <img src={post.authorAvatar} alt={post.author} className="tw-w-10 tw-h-10 tw-rounded-full tw-mr-2" />
                <span className="tw-text-gray-600">{post.author}</span>
              </div>
              <div className="tw-flex tw-justify-between">
                <div className="tw-grid tw-grid-flow-row tw-row-span-2 tw-items-center tw-w-[50%] tw-pr-4">
                  {post.author === 'Admin' ? (
                    <Button variant="contained" color="primary" className="tw-bg-purple-500 tw-my-4 hover:tw-bg-purple-600 tw-w-full tw-text-white tw-mb-2">
                      Xem bài viết
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" color="secondary" className="tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white tw-mr-2" onClick={() => handleConfirmClick(post)}>
                        Xác nhận bài viết
                      </Button>
                      <Button variant="contained" color="error" className="tw-bg-red-500 tw-my-4 hover:tw-bg-red-600 tw-text-white" onClick={() => handleDeleteClick(post)}>
                        Xóa bài viết
                      </Button>
                    </>
                  )}
                </div>
                <div className="tw-mt-4 tw-text-sm tw-flex tw-w-[30%] tw-flex-col tw-text-gray-600">
                  <p><span className="tw-font-bold tw-py-2">Lượt xem:</span> {post.views}</p>
                  <p><span className="tw-font-bold tw-py-2">Danh mục:</span> {post.category}</p>
                  <p><span className="tw-font-bold tw-py-2">Ngày tạo:</span> {post.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="tw-flex tw-justify-between tw-mt-6">
        <Button variant="contained" className="tw-via-violet-500 tw-text-white tw-py-2 tw-px-4" onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Trang trước
        </Button>
        <Button variant="contained" className="tw-via-violet-500 tw-text-white tw-py-2 tw-px-4 tw-ml-4" onClick={() => setPage((prev) => prev + 1)}>
          Trang sau
        </Button>
      </div>

      {/* Confirmation and Delete Dialogs */}
      {openConfirm && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center">
          <div className="tw-bg-white tw-p-4 tw-rounded tw-shadow-lg">
            <h2 className="tw-text-lg tw-font-semibold">Xác nhận bài viết</h2>
            <p>Bạn có chắc chắn muốn xác nhận bài viết này?</p>
            <div className="tw-flex tw-justify-end tw-mt-4">
              <Button onClick={handleClose} className="tw-text-gray-500 tw-mr-4">Hủy</Button>
              <Button variant="contained" className="tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4" onClick={handleConfirm}>Xác nhận</Button>
            </div>
          </div>
        </div>
      )}

      {openDelete && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center">
          <div className="tw-bg-white tw-p-4 tw-rounded tw-shadow-lg">
            <h2 className="tw-text-lg tw-font-semibold">Xóa bài viết</h2>
            <p>Bạn có chắc chắn muốn xóa bài viết "{selectedPost?.title}" không?</p>
            <div className="tw-flex tw-justify-end tw-mt-4">
              <Button onClick={handleClose} className="tw-text-gray-500 tw-mr-4">Hủy</Button>
              <Button variant="contained" className="tw-bg-red-500 tw-text-white tw-py-2 tw-px-4" onClick={handleDelete}>Xóa</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
