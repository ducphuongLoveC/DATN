import { Box, TextField, MenuItem, Button, Grid } from '@mui/material';
import HeaderTitle from '../Title';
import Dialog from '@/components/Dialog';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type FormValues = {
  code: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  max_uses: number;
};

const Coupon: React.FC = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      code: '',
      discount_type: '',
      discount_value: 0,
      start_date: new Date().toISOString().slice(0, 10),
      end_date: '',
      max_uses: 1,
    },
  });

  const handleOpenCreateCoupon = () => {
    setOpenCreate(true);
  };

  const handleCloseCreateCoupon = () => {
    setOpenCreate(false);
    reset(); // Reset form khi đóng dialog
  };

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setValue('code', randomCode);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    handleCloseCreateCoupon();
  };

  return (
    <Box>
      <HeaderTitle
        des="Cho phép quản trị tạo ra các mã giảm giá cho khóa học"
        titleButton="Tạo mã"
        onClick={handleOpenCreateCoupon}
      />
      <Dialog title="Tạo mã" open={openCreate} onClose={handleCloseCreateCoupon}>
        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Code */}
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <Controller
                name="code"
                control={control}
                rules={{ required: 'Vui lòng nhập mã giảm giá' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mã giảm giá"
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    sx={{ flex: 1, mr: 1 }}
                  />
                )}
              />
              <Button variant="outlined" onClick={generateRandomCode}>
                Tạo ngẫu nhiên
              </Button>
            </Grid>
            {/* Discount Type */}
            <Grid item xs={12}>
              <Controller
                name="discount_type"
                control={control}
                rules={{ required: 'Vui lòng chọn loại giảm giá' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Loại giảm giá"
                    error={!!errors.discount_type}
                    helperText={errors.discount_type?.message}
                  >
                    <MenuItem value="percentage">Phần trăm</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            {/* Discount Value */}
            <Grid item xs={12}>
              <Controller
                name="discount_value"
                control={control}
                rules={{ required: 'Vui lòng nhập giá trị giảm giá', min: 1 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Giá trị giảm giá"
                    error={!!errors.discount_value}
                    helperText={errors.discount_value?.message}
                  />
                )}
              />
            </Grid>
            {/* Start Date */}
            <Grid item xs={6}>
              <Controller
                name="start_date"
                control={control}
                rules={{ required: 'Vui lòng chọn ngày bắt đầu' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Ngày bắt đầu"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                  />
                )}
              />
            </Grid>
            {/* End Date */}
            <Grid item xs={6}>
              <Controller
                name="end_date"
                control={control}
                rules={{
                  required: 'Vui lòng chọn ngày kết thúc',
                  validate: (value) =>
                    value >= (control._formValues.start_date || '') || 'Ngày kết thúc phải sau ngày bắt đầu',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label="Ngày kết thúc"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.end_date}
                    helperText={errors.end_date?.message}
                  />
                )}
              />
            </Grid>
            {/* Max Uses */}
            <Grid item xs={12}>
              <Controller
                name="max_uses"
                control={control}
                rules={{
                  required: 'Vui lòng nhập số lần sử dụng tối đa',
                  min: { value: 1, message: 'Số lần sử dụng tối thiểu là 1' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Số lần sử dụng tối đa"
                    error={!!errors.max_uses}
                    helperText={errors.max_uses?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseCreateCoupon} sx={{ mr: 2 }}>
              Hủy
            </Button>
            <Button variant="contained" type="submit">
              Tạo
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Coupon;
