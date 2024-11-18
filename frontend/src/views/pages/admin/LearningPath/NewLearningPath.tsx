import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TextField, Paper, Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import { newLearningPath } from '@/api/learningPathApi';
import { toast, ToastContainer } from 'react-toastify';

// my pj
import HeaderTitle from '../Title';
import TextEditor from '@/components/TextEditor';

import path from '@/constants/routes';
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),

  borderRadius: 0,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

export default function LearningPath() {
  const navigate = useNavigate();
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      thumbnail: '',
      description: '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['learningPath'],
    mutationFn: newLearningPath,
    onSuccess: () => {
      toast.success('Thêm thành công');
      reset();
      navigate('/learning-path');
    },
    onError: () => {
      toast.error('Thêm thất bại');
    },
  });
  const onSubmit = (data: { title: string; thumbnail: string; description: string }) => {
    mutation.mutate(data);
  };

  return (
    <Box>
      <HeaderTitle
        des='Chức năng "Tạo lộ trình học"'
        link={path.admin.LearningPathList}
        titleButton="Danh sách lộ trình học"
      />
      <StyledPaper>
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Tên lộ trình"
                    autoFocus
                    {...field}
                    inputProps={{ minLength: 6, maxLength: 30 }}
                    helperText={`${field.value.length}/30 ký tự`}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    id="thumbnail"
                    label="Ảnh"
                    {...field}
                    inputProps={{ maxLength: 255 }}
                    helperText={`${field.value.length}/255 ký tự`}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextEditor
                initialValue="Mô tả"
                initialHeight="300px"
                onChange={(content) => setValue('description', content)}
                mode="advanced"
              />
            </Grid>
          </Grid>

          <Button variant="outlined" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Đang tạo...' : 'Tạo lộ trình'}
          </Button>
        </StyledForm>
      </StyledPaper>
      <ToastContainer />
    </Box>
  );
}
