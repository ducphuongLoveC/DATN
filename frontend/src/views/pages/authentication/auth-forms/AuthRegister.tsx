import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AnimateButton from '@/ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import { verifyCaptcha } from '@/api/authApi';
import OTPInput from '@/components/OtpInput';
import { createOtp, verifyOtp } from '@/api/otpApi';

const MainInput = styled(OutlinedInput)(() => ({
  input: {
    color: 'black',
  },
}));

const schema = z.object({
  fname: z.string().min(1, 'Họ là bắt buộc'), // First Name
  lname: z.string().min(1, 'Tên là bắt buộc'), // Last Name
  email: z.string().email('Email không hợp lệ').max(255, 'Email không được vượt quá 255 ký tự'), // Email
  isVerifyOtp: z.boolean().refine((val) => val === true, {
    message: 'Bạn cần xác nhận mã OTP trước khi tiếp tục',
  }), // Xác thực OTP
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(255, 'Mật khẩu không được vượt quá 255 ký tự'), // Password
});

const captchaSecret = import.meta.env.VITE_CAPTCHA_SECRET;

export type AuthRegisterData = z.infer<typeof schema>;
interface AuthRegisterProps {
  onSubmit: (data: AuthRegisterData) => void;
}

const AuthRegister: React.FC<AuthRegisterProps> = ({ onSubmit, ...others }) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const [stepOtp, setStepOtp] = useState('send');
  const [showPassword, setShowPassword] = useState(false);

  const [, setStrength] = useState<number>(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<AuthRegisterData>({
    resolver: zodResolver(schema),
  });

  const { mutate: mttCreateOtp, isPending: isPendingCreateOtp } = useMutation({
    mutationKey: ['create_otp'],
    mutationFn: createOtp,
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
      setStepOtp('');
      setOtpVerified(true);
      setValue('isVerifyOtp', true, { shouldValidate: true });
      setOtpError('');
    },
    onError: () => {
      setValue('isVerifyOtp', false);
      setOtpError('Otp không đúng vui lòng nhập lại');
    },
  });

  const [level, setLevel] = useState<{ color: string; label: string } | undefined>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleCaptchaChange = async (token: string | null) => {
    let result = await verifyCaptcha(token);
    setCaptchaVerified(result);
    if (!result) {
      setCaptchaError('Xác thực captcha thất bại');
    } else {
      setCaptchaError('');
    }
    console.log(result);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}></Grid>

      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          if (captchaVerified) {
            setCaptchaError('');
            onSubmit(data);
          } else {
            setCaptchaError('Vui lòng xác thực captcha.');
          }
        })}
        {...others}
      >
        <Grid container spacing={matchDownSM ? 0 : 2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="fname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Tên đệm"
                  margin="normal"
                  sx={{
                    ...theme.typography.customInput,
                    input: { color: 'black' },
                  }}
                  error={!!errors.fname}
                  helperText={errors.fname ? String(errors.fname.message) : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Tên"
                  margin="normal"
                  sx={{
                    ...theme.typography.customInput,
                    input: { color: 'black' },
                  }}
                  error={!!errors.lname}
                  helperText={errors.lname ? String(errors.lname.message) : ''}
                />
              )}
            />
          </Grid>
        </Grid>

        <FormControl fullWidth error={!!errors.email} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <MainInput {...field} id="outlined-adornment-email-register" type="email" inputProps={{}} />
            )}
          />
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text--register">
              {String(errors.email.message)}
            </FormHelperText>
          )}
        </FormControl>

        {stepOtp === 'send' && (
          <Box>
            {isPendingCreateOtp ? (
              'Đang tạo mã OTP...'
            ) : (
              <Button
                onClick={() => {
                  mttCreateOtp(getValues('email'));
                }}
              >
                Lấy mã OTP
              </Button>
            )}
          </Box>
        )}

        {stepOtp == 'verify' && (
          <OTPInput
            onComplete={(otp) => {
              const payload = {
                email: getValues('email'),
                otp,
              };
              mttVerifyOtp(payload);
            }}
          />
        )}
        {errors.isVerifyOtp && <FormHelperText error>{errors.isVerifyOtp.message}</FormHelperText>}
        {otpError && <FormHelperText error>{otpError}</FormHelperText>}
        {otpVerified && <FormHelperText sx={{ color: 'success.main' }}>Đã xác thực OTP!</FormHelperText>}

        <FormControl fullWidth error={!!errors.password} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-register">Mật khẩu</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  changePassword(e.target.value);
                }}
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
          {errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-register">
              {String(errors.password.message)}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" fontSize="0.75rem">
                  {level?.label}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </FormControl>

        <Box>
          <ReCAPTCHA sitekey={captchaSecret} onChange={handleCaptchaChange} />
          {captchaError && <FormHelperText error>{captchaError}</FormHelperText>}
        </Box>

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{
                background: 'var(--color-primary)', // Sử dụng biến CSS đã sửa
                color: '#fff',
              }}
            >
              Đăng ký
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default AuthRegister;
