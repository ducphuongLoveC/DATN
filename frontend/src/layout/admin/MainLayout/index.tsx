import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    useMediaQuery,
    styled,
    useTheme,
} from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import Breadcrumbs from '@/ui-component/extended/Breadcrumbs';
import { SET_MENU } from '@/store/actions';
import { drawerWidth } from '@/store/constant';
import { IconChevronRight } from '@tabler/icons-react';

interface MainLayoutProps {
    children: React.ReactNode;
}

// Styled component for main content
const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme',
})<{ theme: any; open: boolean }>(({ theme, open }) => ({
    ...theme.typography.mainContent,
    background: theme.palette.background.paper2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
              }
            : {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
              }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
    },
}));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const theme: any = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const leftDrawerOpened = useSelector(
        (state: any) => state.customization.opened
    );
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({
            type: SET_MENU,
            opened: !leftDrawerOpened,
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                background: theme.palette.background.paper,
            }}
        >
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.paper,
                    transition: leftDrawerOpened
                        ? theme.transitions.create('width')
                        : 'none',
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            <Sidebar
                drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                drawerToggle={handleLeftDrawerToggle}
            />

            <Main theme={theme} open={leftDrawerOpened}>
                <Breadcrumbs
                    separator={IconChevronRight}
                    navigation={[]}
                    icon
                    title
                    rightAlign
                />
                {/* Assuming Outlet is imported correctly */}
                {children}
            </Main>
            <Customization />
        </Box>
    );
};

export default MainLayout;
