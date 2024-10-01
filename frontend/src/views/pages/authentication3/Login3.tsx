import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login: React.FC = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md')); // Kiểm tra màn hình nhỏ hơn md

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
            <Grid
              item
              xs={12}
              md={6}
              container
              justifyContent="center"
              alignItems="center"
            >
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
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                          marginBottom={'20px'}
                        >
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
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        bgcolor: theme.palette.divider,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
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
    </AuthWrapper1>
  );
};

export default Login;
