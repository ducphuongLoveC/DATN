import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';



// defaultTheme
import themes from '@/themes';

// project imports
import NavigationScroll from '@/layout/admin/NavigationScroll';


import { router } from "@/routes";

const App = () => {


  const themeSelect = useSelector((state: any) => {

    return window.location.hostname.startsWith('admin')
      ? state.customization : state.homeReducer
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(themeSelect)}>
        <CssBaseline />
        <NavigationScroll>
          <div>
            {router}
          </div>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
export default App;
