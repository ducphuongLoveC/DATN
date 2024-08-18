import { useTheme, Theme } from '@mui/material';
import clsx from 'clsx';

import Footer from './Footer';
import Navbar from './NavBar';
import SideBar from './SideBar';
import s from './MainLayout.scss.module.scss';


interface MainLayoutProp {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
    const theme: Theme = useTheme();
    return (
        <> 
            <Navbar />
            <div style={{ background: theme.palette.background.paper }} className="tw-flex tw-width-100">
                <SideBar />
                <div className={clsx(s['container'])}>{children}</div>
            </div>
            <Footer />
        </>
    );
};
export default MainLayout;
