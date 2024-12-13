import { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Paper,
  Chip,
  Grid,
  Tooltip,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  Autocomplete,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { TrendingUp, Add } from '@mui/icons-material';

// icon
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

// api
import { fetchLearningPaths } from '@/api/learningPathApi';

// my pj
import { RootState } from '@/store/reducer';

type Level = 'easy' | 'medium' | 'high';

interface CourseData {
  _id?: string;
  learning_path_ids: string[];
  user_id: string;
  original_price: number;
  sale_price: number;
  learning_outcomes: string[];
  level: Level;
  has_certificate: boolean;
  isFree?: boolean;
  isActive: boolean;
}

const OptionOther = forwardRef(({ defaultValue }: any, ref) => {
  const user = useSelector((state: RootState) => state.authReducer.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<CourseData>({
    defaultValues: {
      learning_path_ids: defaultValue?.learning_path_ids || [],
      user_id: user._id,
      original_price: parseInt(defaultValue?.original_price || '0'),
      sale_price: parseInt(defaultValue?.sale_price || '0'),
      learning_outcomes: defaultValue?.learning_outcomes || [],
      level: defaultValue?.level || 'easy',
      has_certificate: defaultValue?.has_certificate !== undefined ? defaultValue.has_certificate : false,
      isFree: defaultValue?.isFree !== undefined ? defaultValue.isFree : true,
      isActive: defaultValue?.isActive !== undefined ? defaultValue.isActive : false,
    },
  });

  const getData = () => ({ ...getValues() });

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const isFree = watch('isFree');

  const theme = useTheme();
  const [newOutcome, setNewOutcome] = useState<string>('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['learning_path'],
    queryFn: fetchLearningPaths,
  });

  const handleAddOutcome = () => {
    if (newOutcome.trim() !== '') {
      setValue('learning_outcomes', [...watch('learning_outcomes'), ...newOutcome.split('\n')]);
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (index: number) => {
    const outcomes = watch('learning_outcomes');
    setValue(
      'learning_outcomes',
      outcomes.filter((_, i) => i !== index)
    );
  };

  const getDifficultyColor = (level: Level) => {
    switch (level) {
      case 'easy':
        return '#4caf50';
      case 'medium':
        return '#ff9800';
      case 'high':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const onSubmit = (data: CourseData) => {
    console.log(data);
    alert('Dữ liệu đã được in ra console');
  };

  const options = useMemo(() => {
    return data?.map(({ title, _id }: { title: string; _id: string }) => ({ label: title, value: _id }));
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  return (
    <Paper sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="radio-group-label">Chọn loại khóa học</FormLabel>
              <Controller
                name="isFree"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row onChange={(e) => setValue('isFree', e.target.value === 'true')}>
                    <FormControlLabel value={true} control={<Radio />} label="Khóa học miễn phí" />
                    <FormControlLabel value={false} control={<Radio />} label="Khóa học tính phí" />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
          {/* Hiển thị các trường nhập giá chỉ khi isFree = false */}
          {!isFree && (
            <>
              <Grid item xs={12} md={6}>
                <Controller
                  name="original_price"
                  control={control}
                  render={({ field }) => <TextField fullWidth label="Giá bình thường" type="number" {...field} />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="sale_price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Giá sale"
                      type="number"
                      error={!!errors.sale_price}
                      helperText={
                        +watch('sale_price') > +watch('original_price')
                          ? 'Giá sale không thể cao hơn giá bình thường'
                          : ''
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="radio-group-label">Chứng chỉ</FormLabel>
              <Controller
                name="has_certificate"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} onChange={(e) => setValue('has_certificate', e.target.value === 'true')}>
                    <FormControlLabel value={true} control={<Radio />} label="Khóa học này cung cấp chứng chỉ" />
                    <FormControlLabel value={false} control={<Radio />} label="Khóa học này không cung cấp chứng chỉ" />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} ml={2} mt={2} sx={{ backgroundColor: theme.palette.background.paper2 }}>
            <FormControl>
              <FormLabel id="radio-group-label">Cài đặt công khai</FormLabel>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} onChange={(e) => setValue('isActive', e.target.value === 'true')}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label={
                        <>
                          <PublicIcon sx={{ mr: 1 }} />
                          Công khai khóa học
                        </>
                      }
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label={
                        <>
                          <LockIcon sx={{ mr: 1 }} /> Riêng tư khóa học
                        </>
                      }
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="radio-group-label">Chọn các danh mục</FormLabel>
              <Controller
                name="learning_path_ids"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple // Kích hoạt chế độ chọn nhiều
                    options={options} // Danh sách các lựa chọn
                    getOptionLabel={(option) => option.label} // Hiển thị nhãn
                    isOptionEqualToValue={(option, value) => option.value === value.value} // So sánh giá trị
                    onChange={(_, value) => field.onChange(value.map((item) => item.value))} // Cập nhật giá trị
                    value={
                      // Kiểm tra và thiết lập giá trị
                      field.value?.map((id) => ({
                        label: options.find((opt: any) => opt.value === id)?.label || '',
                        value: id,
                      })) || [] // Nếu không có giá trị, trả về mảng rỗng
                    }
                    renderInput={(params) => <TextField {...params} placeholder="Chọn danh mục" />}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel id="difficulty-level-label">Chọn cấp độ</FormLabel>

              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="difficulty-level-label"
                    value={field.value}
                    onChange={field.onChange}
                    startAdornment={
                      <TrendingUp
                        sx={{
                          mr: 1,
                          color: getDifficultyColor(field.value),
                        }}
                      />
                    }
                  >
                    <MenuItem value="easy">Dễ</MenuItem>
                    <MenuItem value="medium">Trung bình</MenuItem>
                    <MenuItem value="high">Nâng cao</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              Kết quả học tập
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <TextField
                multiline
                fullWidth
                label="Thêm kết quả học tập"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Tooltip title="Thêm kết quả học tập">
                <IconButton onClick={handleAddOutcome} color="primary" sx={{ mt: 1 }}>
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: 'background.default',
                minHeight: '150px',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {watch('learning_outcomes').length === 0 ? (
                <Typography color="text.secondary" textAlign="center">
                  Chưa có kết quả học tập nào được thêm
                </Typography>
              ) : (
                watch('learning_outcomes').map((outcome, index) => (
                  <Chip
                    key={index}
                    label={outcome}
                    onDelete={() => handleRemoveOutcome(index)}
                    color="primary"
                    variant="outlined"
                    sx={{ m: 0.5, maxWidth: '100%' }}
                  />
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
});

export default OptionOther;
