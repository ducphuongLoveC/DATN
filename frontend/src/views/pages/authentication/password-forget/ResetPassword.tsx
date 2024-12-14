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
// ============================|| FIREBASE - LOGIN ||============================ //

export interface FormLoginValues {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordProps {
  isLoading: boolean;
  onSubmit: (values: FormLoginValues) => void;
}

const MainInput = styled(OutlinedInput)(() => ({
  input: {
    color: 'black',
    width: '100%',
  },
}));
const schema = z
  .object({
    newPassword: z.string().min(6, 'Mật khẩu phải trên 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu phải trên 6 ký tự'),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

const ResetPassword: React.FC<ResetPasswordProps> = ({ isLoading, onSubmit, ...others }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });
  const theme: any = useTheme();

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
      <FormControl
        sx={{
          ...theme.typography.customInput,
        }}
        fullWidth
        error={Boolean(errors.newPassword)}
      >
        <InputLabel htmlFor="outlined-adornment-new-password">Nhập mật khẩu mới</InputLabel>
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              id="outlined-adornment-new-password"
              type="password"
              label="Nhập mật khẩu mởi"
              inputProps={{}}
            />
          )}
        />
        {errors.newPassword && (
          <FormHelperText error id="standard-weight-helper-text-new-password">
            {errors.newPassword.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl
        sx={{
          ...theme.typography.customInput,
        }}
        fullWidth
        error={Boolean(errors.confirmPassword)}
      >
        <InputLabel htmlFor="outlined-adornment-confirm-password">Xác nhận mật khẩu</InputLabel>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <MainInput
              {...field}
              id="outlined-adornment-confirm-password"
              type="password"
              label="Xác nhận mật khẩu"
              inputProps={{}}
            />
          )}
        />
        {errors.confirmPassword && (
          <FormHelperText error id="standard-weight-helper-text-confirm-password">
            {errors.confirmPassword.message}
          </FormHelperText>
        )}
      </FormControl>

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
            {isLoading ? <BeatLoader style={{ marginLeft: '3px' }} color="white" size={10} /> : 'Thay đổi mật khẩu'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
};

export default ResetPassword;
