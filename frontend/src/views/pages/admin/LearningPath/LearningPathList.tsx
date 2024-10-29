import React, { useState } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';

import { useForm, Controller } from 'react-hook-form';
// ui frw
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Button,
  TextField,
  Tooltip,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

//icon
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

// my pj
import TextEditor from '@/components/TextEditor';
import LearningPathSkeletonList from '@/ui-component/cards/Skeleton/LearningPathListSkl';
import Dialog from '@/components/Dialog';
import {
  deleteLearningPath,
  fetchLearningPaths,
  updateLearningPath,
} from '@/api/learningPathApi';

import path from '@/constants/routes';
import HeaderTitle from '../Title';

export interface LearningPath {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
}

export default function LearningPathList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['learningPath'],
    queryFn: fetchLearningPaths,
  });

  const mutation = useMutation<
    { _id: string; updateData: LearningPath },
    Error,
    { _id: string; updateData: LearningPath }
  >({
    mutationKey: ['learningPath'],
    mutationFn: ({ _id, updateData }) => updateLearningPath(_id, updateData),
    onSuccess: () => {
      toast.success('Sửa thành công.');
      handleCloseDialog();
      refetch();
    },
    onError: (error) => {
      toast.error('Sửa thất bại!');
      console.log(error);
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ['learningPath'],
    mutationFn: deleteLearningPath,
    onSuccess: () => {
      toast.success('Xóa thành công');
      refetch();
    },
    onError: () => {
      toast.success('xóa thất bại');
    },
  });

  const { control, handleSubmit, reset, setValue, getValues } =
    useForm<LearningPath>({
      defaultValues: {
        title: '',
        thumbnail: '',
        description: '',
      },
    });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEdit = (path: LearningPath) => {
    setCurrentPath(path);
    setEditMode(true);
    setOpenDialog(true);
    reset({
      title: path.title,
      thumbnail: path.thumbnail,
      description: path.description,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có muốn xóa không?')) {
      mutationDelete.mutate(id);
    }
  };

  const openView = (path: LearningPath) => {
    setCurrentPath(path);
    setEditMode(false);
    setOpenDialog(true);
    reset({
      title: path.title,
      thumbnail: path.thumbnail,
      description: path.description,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPath(null);
    setEditMode(false);
  };

  const onSubmit = (data: LearningPath) => {
    console.log('Saving changes:', data);
    handleEdit(data);
  };

  const handleEdit = (data: LearningPath) => {
    if (currentPath?._id) {
      mutation.mutate({
        _id: currentPath?._id,
        updateData: data,
      });
    }
  };

  if (isLoading) return <LearningPathSkeletonList />;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <HeaderTitle
        des='Chức năng "danh sách lộ trình học" cho phép quản trị viên có 
        cái nhìn trực quan về tổng thể lộ trình. Bao gồm Chi tiết, Sửa, Xóa'
        link={path.admin.newLearningPath}
        titleButton="Tạo lộ trình học"
      />
      <Box sx={{ width: '100%' }}>
        <TableContainer component={Paper}sx={{borderRadius:0}}>
          <Table sx={{ minWidth: 650 }} aria-label="learning paths table">
            <TableHead>
              <TableRow>
                <TableCell>Tên lộ trình</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((path: LearningPath) => (
                  <TableRow
                    key={path._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {path.title}
                    </TableCell>
                    <TableCell>
                      <img
                        src={path.thumbnail}
                        alt={path.title}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>
                      {path.description.substring(0, 100)}...
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          onClick={() => openView(path)}
                          color="primary"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sửa">
                        <IconButton
                          onClick={() => openEdit(path)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton
                          onClick={() => handleDelete(path._id)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={editMode ? 'Sửa learning path' : 'Xem chi tiết learning path'}
      >
        {currentPath && (
          <Box
            sx={{ pt: 2 }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Title"
                  {...field}
                  disabled={!editMode}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Thumbnail URL"
                  {...field}
                  disabled={!editMode}
                  margin="normal"
                />
              )}
            />

            {}
            <TextEditor
              initialValue={getValues('description')}
              onChange={(content) => setValue('description', content)}
              mode="advanced"
              disabled={!editMode}
              initialHeight="300px"
            />
            <Button onClick={handleCloseDialog} color="primary">
              {editMode ? 'Cancel' : 'Close'}
            </Button>
            {editMode && (
              <Button type="submit" color="primary" variant="contained">
                {mutation.isPending ? 'saving...' : 'save'}
              </Button>
            )}
          </Box>
        )}
      </Dialog>
      <ToastContainer />
    </>
  );
}
