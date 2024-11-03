import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { zodResolver } from '@hookform/resolvers/zod';

const MainInput = styled(OutlinedInput)(() => ({
  input: {
    color: 'black',
  },
}));

const schema = z.object({
  fname: z.string().min(1, 'First Name is required'),
  lname: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Must be a valid email').max(255),
  password: z.string().min(1, 'Password is required').max(255),
});

type AuthLoginData = z.infer<typeof schema>;
interface AuthRegisterProps {
  onSubmit: (data: AuthLoginData) => void;
}
const AuthRegister: React.FC<AuthRegisterProps> = ({onSubmit ,...others }) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [, setStrength] = useState<number>(0);
  const [level, setLevel] = useState<{ color: string; label: string } | undefined>();

  console.log(level);

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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthLoginData>({
    resolver: zodResolver(schema),
  });

  
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}></Grid>

      <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
        <Grid container spacing={matchDownSM ? 0 : 2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="fname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
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
                  label="Last Name"
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
          <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
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

        <FormControl fullWidth error={!!errors.password} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
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

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label={
                <Typography variant="subtitle1">
                  Agree with &nbsp;
                  <Typography variant="subtitle1" component={Link} to="#">
                    Terms & Condition.
                  </Typography>
                </Typography>
              }
            />
          </Grid>
        </Grid>

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




