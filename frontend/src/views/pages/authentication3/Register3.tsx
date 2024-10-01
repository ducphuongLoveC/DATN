import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from '@/ui-component/Logo';
import AuthRegister from '../authentication/auth-forms/AuthRegister';
import AuthFooter from '@/ui-component/cards/AuthFooter';

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register: React.FC = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const theme = useTheme();
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
            <Grid
              item
              md={6}
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
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
                            Đăng ký
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
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
                        to="/auth/login"
                        variant="subtitle1"
                        sx={{
                          textDecoration: 'none',
                        }}
                      >
                        Already have an account?
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
    </AuthWrapper1>
  );
};

export default Register;
