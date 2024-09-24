import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// defaultTheme
import themes from '@/themes';

// project imports
import NavigationScroll from '@/layout/admin/NavigationScroll';

import { router } from '@/routes';
import getMainDomain from './utils/getMainDoumain';
const App: React.FC = () => {    

    console.log(getMainDomain());
    
    const state = useSelector(
        (state: any) =>
            window.location.hostname.startsWith('admin')
                ? state.customization
                : state.homeReducer,
        (prev, next) => prev === next // So sánh nông để tránh re-render không cần thiết
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
