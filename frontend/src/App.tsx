import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from '@/themes';

// project imports
import { router } from '@/routes';

import moment from 'moment';
moment.locale('vi');

const App: React.FC = () => {
  const state = useSelector(
    (state: any) => (window.location.hostname.startsWith('admin') ? state.customization : state.homeReducer),
    (prev, next) => prev === next
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(state)}>
        <CssBaseline />
        <div>{router}</div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
