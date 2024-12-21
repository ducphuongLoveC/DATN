import React, { useEffect, useRef, useState } from 'react';

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
  Typography,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

//icon
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

// my pj

import TextEditor from '@/components/TextEditor';
import LearningPathSkeletonList from '@/ui-component/cards/Skeleton/LearningPathListSkl';
import Dialog from '@/components/Dialog';
import { deleteLearningPath, fetchLearningPaths, newLearningPath, updateLearningPath } from '@/api/learningPathApi';

import HeaderTitle from '../Title';
import useDebounce from '@/hooks/useDebounce';

export interface LearningPath {
  _id: string;
  title: string;
  description: string;
}

export default function LearningPathList() {
  const [params, setParams] = useState({
    search: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [editMode, setEditMode] = useState<'create' | 'update' | 'detail' | ''>('');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['learningPath', params],
    queryFn: () => fetchLearningPaths(params),
  });

  const refInput = useRef<HTMLDivElement | null>(null);

  const mutationCreate = useMutation({
    mutationKey: ['learningPath'],
    mutationFn: newLearningPath,
    onSuccess: () => {
      refetch();
      toast.success('Tạo thành công');
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const mutationUpdate = useMutation<
    { _id: string; updateData: LearningPath },
    Error,
    { _id: string; updateData: LearningPath }
  >({
    mutationKey: ['learningPath'],
    mutationFn: ({ _id, updateData }) => updateLearningPath(_id, updateData),
    onSuccess: () => {
      toast.success('Cập nhật thành công.');
      handleCloseDialog();
      refetch();
    },
    onError: (error) => {
      toast.error('Cập nhật thất bại!');
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

  const { control, handleSubmit, reset, setValue, getValues } = useForm<LearningPath>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    setParams((pre) => ({ ...pre, search: debouncedSearchValue }));
  }, [debouncedSearchValue]);

  useEffect(() => {
    console.log(refInput);

    refInput.current?.focus();
  }, [data, debouncedSearchValue]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openCreate = () => {
    reset({
      title: '',
      description: '',
    });
    setEditMode('create');
    setOpenDialog(true);
  };

  const openEdit = (path: LearningPath) => {
    setCurrentPath(path);
    setEditMode('update');
    setOpenDialog(true);
    reset({
      title: path.title,
      description: path.description,
    });
  };

  const openView = (path: LearningPath) => {
    setCurrentPath(path);
    setEditMode('detail');
    setOpenDialog(true);
    reset({
      title: path.title,
      description: path.description,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPath(null);
    setEditMode('');
  };

  const onSubmit = (data: LearningPath) => {
    console.log('Saving changes:', data);

    switch (editMode) {
      case 'create':
        handleCreate(data);
        break;
      case 'update':
        handleEdit(data);
        break;
    }
  };

  const handleCreate = (data: LearningPath) => {
    mutationCreate.mutate(data);
    setOpenDialog(false);
  };

  const handleEdit = (data: LearningPath) => {
    if (currentPath?._id) {
      mutationUpdate.mutate({
        _id: currentPath?._id,
        updateData: data,
      });
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có muốn xóa không?')) {
      mutationDelete.mutate(id);
    }
  };

  if (isLoading) return <LearningPathSkeletonList />;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <HeaderTitle
        des='Chức năng "danh mục khóa học" giúp quản trị viên có 
        cái nhìn trực quan về tổng thể các danh mục. Gồm các chức năng Chi tiết, Sửa, Xóa'
        onClick={openCreate}
        titleButton="Tạo lộ trình học"
      />

      <Box sx={{ mb: 2, p: 2 }} component={Paper}>
        <TextField
          inputRef={refInput}
          placeholder="Tìm kiếm..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ maxWidth: 300 }}
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table sx={{ minWidth: 650 }} aria-label="learning paths table">
            <TableHead>
              <TableRow>
                <TableCell>Tên danh mục</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((path: LearningPath) => (
                <TableRow key={path._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {path.title}
                  </TableCell>

                  <TableCell>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: path.description.substring(0, 100),
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Xem chi tiết">
                      <IconButton onClick={() => openView(path)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sửa">
                      <IconButton onClick={() => openEdit(path)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton onClick={() => handleDelete(path._id)} color="error">
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
        title={
          editMode === 'create' ? 'Thêm learning path' : editMode === 'update' ? 'Sửa learning path' : 'Xem chi tiết'
        }
      >
        <Box sx={{ pt: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Title" {...field} disabled={editMode === 'detail'} margin="normal" />
            )}
          />

          <TextEditor
            initialValue={getValues('description')}
            onChange={(content) => setValue('description', content)}
            mode="advanced"
            disabled={!editMode}
            initialHeight="300px"
          />
          <Box mt={2}>
            <Button onClick={handleCloseDialog} color="primary">
              {editMode ? 'Hủy' : 'Đóng'}
            </Button>
            {editMode !== 'detail' && (
              <Button type="submit" color="primary" variant="outlined">
                {mutationCreate.isPending || mutationUpdate.isPending ? 'Đang lưu...' : 'Lưu'}
              </Button>
            )}
          </Box>
        </Box>
      </Dialog>
      <ToastContainer />
    </>
  );
}
