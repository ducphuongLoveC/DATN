import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

// toast
import { toast, ToastContainer } from 'react-toastify';
// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// project imports
import * as actionTypes from '@/store/actions';

import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin, { FormLoginValues } from '../authentication/auth-forms/AuthLogin';

// api
import { login } from '@/api/authApi';
import Cookies from 'js-cookie';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['user'],
    mutationFn: login,
    onSuccess: (res) => {
      console.log(res.data);
      toast.success('Đăng nhập thành công!');

      Cookies.set('accessToken', res.data.accessToken || '');
      Cookies.set('user', JSON.stringify(res.data.user || {}));
      console.log(res.data.user);
      dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: res.data.accessToken });
      dispatch({ type: actionTypes.SET_USER, payload: res.data.user });

      navigate('/');
    },
    onError: (error) => {
      toast.error('Mật khẩu hoặc tài khoản không đúng. Thử lại!');
      console.log(error);
    },
  });

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md')); // Kiểm tra màn hình nhỏ hơn md

  const handleLogin = async (data: FormLoginValues) => {
    mutation.mutate(data);
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
            {!downMD && ( // Ẩn banner khi nhỏ hơn MD
              <Grid item md={6}>
                <img width="80%" src="/images/banauth.webp" alt="Banner" />
              </Grid>
            )}
            <Grid item xs={12} md={6} container justifyContent="center" alignItems="center">
              <AuthCardWrapper>
                <Grid>
                  <Grid item sx={{ mb: 3 }}></Grid>
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
                            Đăng nhập
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin onSubmit={handleLogin} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        bgcolor: theme.palette.divider,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/auth/register"
                        variant="subtitle1"
                        sx={{
                          textDecoration: 'none',
                          color: theme.palette.primary.main,
                        }}
                      >
                        Bạn chưa có tài khoản?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </AuthWrapper1>
  );
};

export default Login;
