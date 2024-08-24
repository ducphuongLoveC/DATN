import { useTheme, Theme } from '@mui/material';
import clsx from 'clsx';

import Footer from './Footer';
import Navbar from './NavBar';
import SideBar from './SideBar';
import s from './MainLayout.scss.module.scss';
import { useState } from 'react';

interface MainLayoutProp {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
    const [state, setState] = useState(1);

    const theme: Theme = useTheme();
    return (
        <div
            style={{
                background: theme.palette.background.paper,
            }}
        >
            <Navbar />
            <div className="tw-flex tw-width-100">
                <SideBar />
                <div className={clsx(s['container'])}>{children}</div>
            </div>
            <Footer />
            {state}
            <button onClick={() => setState(state + 1)}>Imcriment</button>
        </div>
    );
};
export default MainLayout;
