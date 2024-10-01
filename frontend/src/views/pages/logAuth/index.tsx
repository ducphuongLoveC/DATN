import { useTheme } from '@mui/material';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import { Grid } from '@mui/material';

import { TypeAnimation } from 'react-type-animation';

const LogAuth: React.FC = () => {
  const theme = useTheme();
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
        <AuthLogin onSubmit={(value) => console.log(value)} />
      </Grid>
    </Grid>
  );
};

export default LogAuth;
