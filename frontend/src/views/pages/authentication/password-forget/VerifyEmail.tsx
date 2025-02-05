// material-ui
import { useTheme, styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';

import FormHelperText from '@mui/material/FormHelperText';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// third-party
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { BeatLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { verifyCaptcha } from '@/api/authApi';

const captchaSecret = import.meta.env.VITE_CAPTCHA_SECRET;

// ============================|| FIREBASE - LOGIN ||============================ //

export interface FormLoginValues {
  email: string;
  password: string;
}

interface VerifyEmailProps {
  isLoading: boolean;
  onSubmit?: (values: FormLoginValues) => void;
}

const MainInput = styled(OutlinedInput)(() => ({
  input: {
    color: 'black',
    width: '100%',
  },
}));
// Zod validation schema
const schema = z.object({
  email: z.string().email('Nhập đúng định dạng email').max(255, 'Email quá dài'),
});

const VerifyEmail: React.FC<VerifyEmailProps> = ({ isLoading, onSubmit, ...others }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const theme: any = useTheme();

  const captchaRef = useRef<ReCAPTCHA>(null);

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

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

  console.log(captchaVerified);

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        if (captchaVerified) {
          setCaptchaError('');
          if (onSubmit) {
            setCaptchaVerified(false);
            captchaRef.current?.reset();
            onSubmit(data);
          }
        } else {
          setCaptchaError('Vui lòng xác thực captcha.');
        }
      })}
      {...others}
    >
      <FormControl
        sx={{
          ...theme.typography.customInput,
        }}
        fullWidth
        error={Boolean(errors.email)}
      >
        <InputLabel htmlFor="outlined-adornment-email-login">Nhập email</InputLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <MainInput {...field} id="outlined-adornment-email-login" type="email" label="Nhập email" inputProps={{}} />
          )}
        />
        {errors.email && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>

      <Box>
        <ReCAPTCHA
          ref={captchaRef} // Gắn ref vào captcha
          sitekey={captchaSecret}
          onChange={handleCaptchaChange}
        />
        {captchaError && <FormHelperText error>{captchaError}</FormHelperText>}
      </Box>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <AnimateButton>
          <Button
            disableElevation
            disabled={isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              background: 'var(--color-primary)',
              color: '#fff',
            }}
          >
            {isLoading ? <BeatLoader style={{ marginLeft: '3px' }} color="white" size={10} /> : 'Xác thực và nhận mã'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
};

export default VerifyEmail;
