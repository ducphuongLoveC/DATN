import { useState, forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  InputAdornment,
  Chip,
  //   Button,
  Grid,
  Tooltip,
  IconButton,
} from '@mui/material';
import { AttachMoney, School, TrendingUp, Add } from '@mui/icons-material';

type level = 'easy' | 'medium' | 'advanced';

interface CourseData {
  original_price: number;
  sale_price: number;
  learning_outcomes: string[];
  level: level;
}

const OptionOther: React.FC = forwardRef((_, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<CourseData>({
    defaultValues: {
      original_price: 0,
      sale_price: 0,
      learning_outcomes: [],
      level: 'medium',
    },
  });

  const learning_outcomes = watch('learning_outcomes');
  const [newOutcome, setNewOutcome] = useState<string>('');

  const getData = () => ({ ...getValues() });

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const handleAddOutcome = () => {
    if (newOutcome.trim() !== '') {
      setValue('learning_outcomes', [...learning_outcomes, newOutcome.trim()]);
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (index: number) => {
    setValue(
      'learning_outcomes',
      learning_outcomes.filter((_, i) => i !== index)
    );
  };

  const getDifficultyColor = (level: level) => {
    switch (level) {
      case 'easy':
        return '#4caf50';
      case 'medium':
        return '#ff9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  const onSubmit = (data: CourseData) => {
    console.log(data);
    alert('Dữ liệu đã được in ra console');
  };

  return (
    <Paper sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="original_price"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Giá bình thường"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
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
                    getValues('sale_price') > getValues('original_price')
                      ? 'Giá sale không thể cao hơn giá bình thường'
                      : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="difficulty-level-label">Cấp độ</InputLabel>
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
                    <MenuItem value="advanced">Nâng cao</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <School sx={{ mr: 1 }} /> Kết quả học tập
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <TextField
                fullWidth
                label="Thêm kết quả học tập"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddOutcome()}
                sx={{ mr: 1 }}
              />
              <Tooltip title="Thêm kết quả học tập">
                <IconButton
                  onClick={handleAddOutcome}
                  color="primary"
                  sx={{ mt: 1 }}
                >
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
              {learning_outcomes.length === 0 ? (
                <Typography color="text.secondary" textAlign="center">
                  Chưa có kết quả học tập nào được thêm
                </Typography>
              ) : (
                learning_outcomes.map((outcome, index) => (
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
          <Grid item xs={12}>
            {/* <Button
              type="submit"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Lấy dữ liệu
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
});

export default OptionOther;
