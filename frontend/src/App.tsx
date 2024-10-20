import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from '@/themes';

// project imports
import NavigationScroll from '@/layout/admin/NavigationScroll';
import { router } from '@/routes';

const App: React.FC = () => {
  console.log('check');
  const state = useSelector(
    (state: any) =>
      window.location.hostname.startsWith('admin')
        ? state.customization
        : state.homeReducer,
    (prev, next) => prev === next
  );
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(state)}>
        <CssBaseline />
        <NavigationScroll>
          <div>{router}</div>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
