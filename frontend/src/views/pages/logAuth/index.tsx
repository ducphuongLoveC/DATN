import { useMutation } from '@tanstack/react-query';
// redux
import { useDispatch } from 'react-redux';

// mui
import { useTheme } from '@mui/material';
import { Grid } from '@mui/material';

//toast
import { toast, ToastContainer } from 'react-toastify';
import { TypeAnimation } from 'react-type-animation';

// my pj
import * as actionTypes from '@/store/actions';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import { login } from '@/api/authApi';

// Thêm import cho js-cookie
const adminRoles = ['admin'];

const LogAuth: React.FC = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationKey: ['admin'],
    mutationFn: login,
    onSuccess: ({ data }) => {
      if (data.user.role.includes(adminRoles)) {
        dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: data.accessToken });
        dispatch({ type: actionTypes.SET_USER, payload: data.user });

        window.location.href =
          import.meta.env.VITE_URL_ADMIN +
          `?accessToken=${JSON.stringify(encodeURIComponent(data.accessToken))}&info=${encodeURIComponent(JSON.stringify(data.user))}`;
      } else {
        toast.warn('Tài khoản không đủ quyền hạn!');
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const theme = useTheme();

  const handleLoginAddmin = (data: { email: string; password: string }) => {
    mutation.mutate(data);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent={'center'}
      sx={{
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Grid p={5}>
        <TypeAnimation
          sequence={['Đăng nhập vào admin', 1000]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: '2em',
            display: 'block',
          }}
          // repeat={Infinity}
        />
      </Grid>
      <Grid p={5}>
        <AuthLogin onSubmit={handleLoginAddmin} />
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default LogAuth;
