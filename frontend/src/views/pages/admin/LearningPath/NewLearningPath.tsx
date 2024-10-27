import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TextField, Typography, Paper, Container, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import { newLearningPath } from '@/api/learningPathApi';
import { toast, ToastContainer } from 'react-toastify';

import TextEditor from '@/components/TextEditor';
import ButtonPrimary from '@/components/ButtonPrimary';
import path from '@/constants/routes';
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
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
  const onSubmit = (data: {
    title: string;
    thumbnail: string;
    description: string;
  }) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="lg">
       <Button>
          <Link to={path.admin.newLearningPath}>Danh sách lộ trình học</Link>
        </Button>
      <StyledPaper elevation={6}>
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
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

          <ButtonPrimary
            type="submit"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Đang tạo...' : 'Tạo lộ trình'}
          </ButtonPrimary>
        </StyledForm>
      </StyledPaper>
      <ToastContainer />
    </Container>
  );
}