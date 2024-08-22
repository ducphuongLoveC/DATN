import { useTheme, Theme } from '@mui/material';
import clsx from 'clsx';

import SideBar from '../MainLayout/SideBar';
import Carousel from '@/components/Carousel';
import Navbar from '../MainLayout/NavBar';
import Footer from '../MainLayout/Footer';
import s from './BannerLayout.scss.module.scss';

interface BannerLayoutProp {
    children: React.ReactNode;
}

const fakeSlider = [
    {
        path: '/reactjs',
        image: '/images/react-js-banner.png',
        backgorund: 'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))',
    }
]
const BannerLayout: React.FC<BannerLayoutProp> = ({ children }) => {
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
                className="tw-flex tw-width-100"
            >
                <SideBar />
            </div>
            <div className={clsx(s['container'], 'container')}>
                <Carousel dot sliders={fakeSlider} />
                {children}
            </div>
            <Footer />
        </div>
    );
};
export default BannerLayout;
