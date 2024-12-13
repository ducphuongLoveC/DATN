import { Autocomplete, Box, Button, Grid, MenuItem, TextField } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

type FormValues = {
  code: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  max_uses: number;
  course_ids: string[];
};

interface FormCouponProps {
  textBtn: string;
  values?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
  courses: any;
}
const FormCoupon: React.FC<FormCouponProps> = ({ textBtn, values, courses, onSubmit, onClose }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      code: values?.code || '',
      discount_type: values?.discount_type || '',
      discount_value: values?.discount_value || 0,
      start_date: values?.start_date
        ? new Date(new Date(values.start_date).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16)
        : new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),

        end_date: values?.end_date
        ? new Date(new Date(values.end_date).getTime() + 7 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 16)
        : '',
    
      max_uses: values?.max_uses || 1,
      course_ids: values?.courses?.length ? values.courses.map((c: any) => c._id) : [],
    },
  });

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setValue('code', randomCode);
  };

  return (
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
          <Button sx={{p:1.5}} variant="outlined" onClick={generateRandomCode}>
            Tạo ngẫu nhiên
          </Button>
        </Grid>

        {/* Course Selection */}
        <Grid item xs={12}>
          <Controller
            name="course_ids"
            control={control}
            rules={{ required: 'Vui lòng chọn ít nhất 1 khóa học' }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                id="course-select"
                options={courses}
                getOptionLabel={(option) => option.title}
                value={courses.filter((course: any) => field.value.includes(course._id))}
                onChange={(_, value) => {
                  setValue(
                    'course_ids',
                    value.map((course) => course._id)
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Áp dụng cho khóa học:"
                    error={!!errors.course_ids}
                    helperText={errors.course_ids?.message}
                  />
                )}
              />
            )}
          />
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
                type="datetime-local" // Đổi thành datetime-local
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
                type="datetime-local" // Đổi thành datetime-local
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
                label="Số lượng"
                error={!!errors.max_uses}
                helperText={errors.max_uses?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Hủy
        </Button>
        <Button variant="contained" type="submit">
          {textBtn}
        </Button>
      </Box>
    </Box>
  );
};
export default FormCoupon;
