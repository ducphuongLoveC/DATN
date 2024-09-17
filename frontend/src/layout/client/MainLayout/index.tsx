import { useTheme, Theme } from '@mui/material';
import clsx from 'clsx';

import Footer from './Footer';
import Navbar from './NavBar';
import SideBar from './SideBar';
import s from './MainLayout.scss.module.scss';
import Layout from '../Layout.scss.module.scss';

import { useState } from 'react';

interface MainLayoutProp {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
    const theme: Theme = useTheme();
    return (
        <div
        style={{
            background: theme.palette.background.paper,
        }}
    >
        <Navbar />

        <div
            style={{
                background: theme.palette.background.paper,
            }}
            className="tw-flex"
        >
            <SideBar />
            <div className={clsx(Layout['content-main'])}>
                {children}
            </div>
        </div>
        <Footer />
    </div>
    );
};
export default MainLayout;
