import { useState } from 'react';
import moment from 'moment';

import { useQuery, useMutation } from '@tanstack/react-query';

import {
  Box,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import HeaderTitle from '../Title';
import Dialog from '@/components/Dialog';
import { getPaidCourses } from '@/api/courseApi';
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from '@/api/coupon';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';

// my pj

import FormCoupon from './FormCoupon';

type FormValues = {
  code: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  max_uses: number;
  course_ids: string[];
};

const Coupon: React.FC = () => {
  const theme = useTheme();
  const [openDialogCouponForm, setOpenDialogCouponForm] = useState(false);
  const [openApplyCourseMore, setOpenApplyCourseMore] = useState(false);

  const [applyCourseMoreData, setApplyCourseMoreData] = useState<any>([]);
  const [editData, setEditData] = useState<any>({});
  const [params, setParams] = useState<any>({
    page: 1,
    limit: 5,
    order: 'asc',
  });

  const { data: courses, isLoading: isLoadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: getPaidCourses,
  });

  const {
    data: coupons,
    isLoading: isLoadingCoupons,
    refetch: refetchCouponList,
  } = useQuery({
    queryKey: ['coupons', params],
    queryFn: () => getAllCoupon(params),
  });

  const mutationCreateCoupon = useMutation({
    mutationKey: ['createCoupon'],
    mutationFn: createCoupon,
    onSuccess: () => {
      refetchCouponList();
      toast.success('Tạo mã giảm giá thành công');
    },
    onError(error: any) {
      toast.error(error.response.data.message);
    },
  });

  const mutationUpdateCoupon = useMutation({
    mutationKey: ['updateCoupon'],
    mutationFn: updateCoupon,
    onSuccess: () => {
      setEditData({});
      refetchCouponList();
      toast.success('Cập nhật mã giảm giá thành công');
    },
    onError(error: any) {
      toast.error(error.response.data.message);
    },
  });

  const mutationDeleteCoupon = useMutation({
    mutationKey: ['deleteCoupon'],
    mutationFn: deleteCoupon,
    onSuccess: () => {
      refetchCouponList();
      toast.success('Xóa mã giảm giá thành công');
    },
    onError(error: any) {
      toast.error(error.response.data.message);
    },
  });

  const handleOpenCreateCoupon = () => {
    setOpenDialogCouponForm(true);
  };

  const handleCloseDialogCoupon = () => {
    setOpenDialogCouponForm(false);
    setEditData({});
  };

  const handleOpenApplyCourseMore = () => {
    setOpenApplyCourseMore(true);
  };
  const handleCloseApplyCourseMore = () => {
    setOpenApplyCourseMore(false);
    setApplyCourseMoreData([]);
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm('Xác nhận xóa')) {
      mutationDeleteCoupon.mutate(id);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (Object.keys(editData).length) {
      mutationUpdateCoupon.mutate({
        id: editData._id,
        data,
      });
    } else {
      mutationCreateCoupon.mutate(data);
    }
    handleCloseDialogCoupon();
  };

  if (isLoadingCourses || isLoadingCoupons) return <div>loading...</div>;

  return (
    <Box>
      <HeaderTitle
        des="Cho phép quản trị tạo ra các mã giảm giá cho khóa học"
        titleButton="Tạo mã"
        onClick={handleOpenCreateCoupon}
      ></HeaderTitle>
      {/* main */}

      <Box sx={{ mb: 2, p: 2 }} component={Paper}>
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Sắp xếp theo giá trị giảm</InputLabel>
          <Select
            value={params.order}
            onChange={(e: any) => setParams((pre: any) => ({ ...pre, order: e.target.value }))}
            fullWidth
            label="Sắp xếp theo giá trị giảm"
          >
            <MenuItem value="asc">Tăng dần</MenuItem>
            <MenuItem value="desc">Giảm dần</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table aria-label="learning paths table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Áp dụng khóa học</TableCell>
              <TableCell>Loại giảm giá</TableCell>
              <TableCell>Giá trị giảm</TableCell>
              <TableCell>Đã sử dụng</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Ngày hết hạn</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons?.data?.length > 0 ? (
              coupons.data.map((c: any) => (
                <TableRow key={c._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {c.code}
                  </TableCell>

                  <TableCell>
                    {c.courses.length > 0 && (
                      <>
                        {c.courses.length} khóa học
                        {c.courses.map((course: any) => course.title).join(', ').length > 5 && (
                          <Button
                            onClick={() => {
                              setApplyCourseMoreData(c.courses);
                              handleOpenApplyCourseMore();
                            }}
                            size="small"
                            sx={{ ml: 1 }}
                          >
                            Xem
                          </Button>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>{c.discount_type}</TableCell>
                  <TableCell>
                    {c.discount_value}
                    {(() => {
                      switch (c.discount_type) {
                        case 'percentage':
                          return '%';
                      }
                    })()}
                  </TableCell>
                  <TableCell>{c.used_count}</TableCell>
                  <TableCell>{c.max_uses}</TableCell>
                  <TableCell>{moment(c.start_date).format('HH:mm DD-MM-YYYY')}</TableCell>
                  <TableCell>{moment(c.end_date).format('HH:mm DD-MM-YYYY')}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Sửa">
                      <IconButton
                        onClick={() => {
                          setEditData(c);
                          setOpenDialogCouponForm(true);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton onClick={() => handleDeleteCoupon(c._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography>Không có dữ liệu</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={coupons?.totalCoupons || 0}
        page={params.page - 1}
        rowsPerPage={params?.limit}
        onPageChange={(_event, newPage) => {
          console.log(newPage);

          setParams((pre: any) => ({ ...pre, page: newPage + 1 }));
          // query.set('page', (newPage + 1).toString());
        }}
        onRowsPerPageChange={(event) => {
          const newRowsPerPage = event.target.value;
          setParams((pre: any) => ({ ...pre, page: 1, limit: newRowsPerPage }));

          // query.set('limit', newRowsPerPage);
          // query.set('page', '1');
        }}
      />

      {/* dialog create */}
      <Dialog
        title={Object.keys(editData).length > 0 ? 'Cập nhật mã giảm giá' : 'Tạo mã giảm giá'}
        open={openDialogCouponForm}
        onClose={handleCloseDialogCoupon}
      >
        <FormCoupon
          textBtn={Object.keys(editData).length > 0 ? 'Cập nhật' : 'Tạo'}
          values={Object.keys(editData).length > 0 && editData}
          onClose={handleCloseDialogCoupon}
          courses={courses}
          onSubmit={onSubmit}
        />
      </Dialog>

      <Dialog title="Áp dụng cho khóa học" open={openApplyCourseMore} onClose={handleCloseApplyCourseMore}>
        <Grid container spacing={3}>
          {applyCourseMoreData.map((c: any) => (
            <Grid item md={4} key={c.id}>
              <Link to={`/courses/${c._id}/update`}>
                <Card sx={{ backgroundColor: theme.palette.background.paper2 }}>
                  <CardMedia component="img" alt={c.title} height="140" image={c.thumbnail} />
                  <CardContent sx={{ p: 0 }}>
                    <Typography mt={2} variant="h4" gutterBottom>
                      {c.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default Coupon;
