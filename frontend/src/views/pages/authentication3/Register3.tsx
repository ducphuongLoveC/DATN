import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material';

//toast
import { toast, ToastContainer } from 'react-toastify';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';

import AuthRegister, { AuthRegisterData } from '../authentication/auth-forms/AuthRegister';
import { registerUser } from '@/api/authApi';
import sleep from '@/utils/sleep';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string; // message có thể không tồn tại
}

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['user'],
    mutationFn: registerUser,
    onSuccess: async (data) => {
      toast.success('Đăng ký thành công!');
      await sleep(2000);
      navigate('/auth/login');
      console.log(data);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
      toast.error(`Đăng ký thất bại. ${errorMessage}`);
      console.log(error);
    },
  });
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const theme = useTheme();

  const handleRegisterUser = (data: AuthRegisterData) => {
    const fullName = `${data.fname} ${data.lname}`;
    const fData = {
      name: fullName,
      email: data.email,
      password: data.password,
    };

    mutation.mutate(fData);
  };
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end">
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              background: theme.palette.background.paper,
            }}
          >
            <Grid item md={6} xs={12} container justifyContent="center" alignItems="center">
              <AuthCardWrapper>
                <Grid>
                  <Grid
                    item
                    sx={{
                      mb: 3,
                    }}
                  >
                    <Link to="#" aria-label="theme logo"></Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={{
                        xs: 'column-reverse',
                        md: 'row',
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1} marginBottom={'20px'}>
                          <Typography
                            sx={{
                              background: 'var(--color-primary)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                            gutterBottom
                            variant={downMD ? 'h3' : 'h2'}
                          >
                            Đăng ký
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister onSubmit={handleRegisterUser} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/auth/login"
                        variant="subtitle1"
                        sx={{
                          textDecoration: 'none',
                          color: theme.palette.primary.main,
                        }}
                      >
                        Bạn đã có tài khoản?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
            {!downMD && (
              <Grid item md={6}>
                <img width={'80%'} src="/images/banauth.webp" alt="" />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </AuthWrapper1>
  );
};

export default Register;
