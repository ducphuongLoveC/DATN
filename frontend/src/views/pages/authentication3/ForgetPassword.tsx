import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// toast
import { toast, ToastContainer } from 'react-toastify';
// material-ui

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// api

import VerifyEmail from '../authentication/password-forget/VerifyEmail';
import { createOtpForResetPassword, verifyOtp } from '@/api/otpApi';
import { Box, FormHelperText } from '@mui/material';

// ================================|| AUTH3 - LOGIN ||================================ //
import OTPInput from '@/components/OtpInput';
import ChangePassword from '../authentication/password-forget/ResetPassword';
import { resetPassword } from '@/api/userApi';
import path from '@/constants/routes';
import sleep from '@/utils/sleep';
const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const [stepOtp, setStepOtp] = useState('send');

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md')); // Kiểm tra màn hình nhỏ hơn md

  const { mutate: mttCreateOtp, isPending: isPendingCreateOtp } = useMutation({
    mutationKey: ['create_otp'],
    mutationFn: createOtpForResetPassword,
    onSuccess: () => {
      setStepOtp('verify');
    },
    onMutate: () => {
      setOtpError('');
    },
    onError: (error: string) => {
      setOtpError(error);
    },
  });

  const { mutate: mttVerifyOtp } = useMutation({
    mutationKey: ['verify_otp'],
    mutationFn: verifyOtp,
    onSuccess: () => {
      setStepOtp('change');
      setOtpVerified(true);
      setOtpError('');
    },
    onError: () => {
      setOtpError('Otp không đúng vui lòng nhập lại');
    },
  });

  const { mutate: mttResetPassword, isPending: isPendingResetPassword } = useMutation({
    mutationKey: ['reset_password'],
    mutationFn: (data: any) => resetPassword({ email: email, ...data }),
    onSuccess: async({ data }) => {
      toast.success(data.message);
      await sleep(1000);
      navigate(path.client.auth.login);
    },
    onError: (error: any) => {
      console.log(error);
      toast.success(error.response.data.message);
    },
  });

  const RenderStep = () => {
    switch (stepOtp) {
      case 'send':
        return (
          <VerifyEmail
            isLoading={isPendingCreateOtp}
            onSubmit={({ email }) => {
              setEmail(email);
              mttCreateOtp(email);
            }}
          />
        );
      case 'verify':
        return (
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <OTPInput
              onComplete={(otp) => {
                const payload = {
                  email: email,
                  otp,
                };
                mttVerifyOtp(payload);
              }}
            />
            {otpError && <FormHelperText error>{otpError}</FormHelperText>}
            {otpVerified && <FormHelperText sx={{ color: 'success.main' }}>Đã xác thực OTP!</FormHelperText>}
          </Box>
        );
      case 'change':
        return <ChangePassword isLoading={isPendingResetPassword} onSubmit={mttResetPassword} />;
    }
  };

  return (
    <Box>
      <Grid container display={'flex'} alignItems={'center'}>
        {!downMD && ( // Ẩn banner khi nhỏ hơn MD
          <Grid item md={6}>
            <img width="80%" src="/images/banauth.webp" alt="Banner" />
          </Grid>
        )}
        <Grid item xs={12} md={5}>
          <Grid container>
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
                      {stepOtp === 'send'
                        ? 'Đổi mật khẩu'
                        : stepOtp === 'verify'
                          ? 'Xác nhận OTP'
                          : 'Thay đổi mật khẩu'}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <RenderStep />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ToastContainer />
    </Box>
  );
};

export default ForgetPassword;
