import MainLayout from '@/layout/client/MainLayout';
import BannerLayout from '@/layout/client/BannerLayout';

import Home from '@/views/pages/Home';
import RouteProp from '../interfaces/route';
import Login3 from '@/views/pages/authentication3/Login3';
import Register3 from '@/views/pages/authentication3/Register3';

import path from '@/constants/routes';

import Baiviet from '@/views/pages/Baiviet';

const publicRoutes: RouteProp[] = [
    {
        path: '/',
        layout: BannerLayout,
        page: Home,
    },
    {
        path: path.client.contact,
        layout: MainLayout,
        page: () => <h1>Bài viết</h1>,
    },
    {
        path: path.client.news,
        layout: MainLayout,
        page: () => <h1>Liên hệ</h1>,
    },
    {
        path: path.client.auth.login,
        layout: MainLayout,
        page: Login3,
    },
    {
        path: path.client.auth.register,
        layout: MainLayout,
        page: Register3,
    },
    {
        path: '/bai-viet',
        layout: MainLayout,
        page: Baiviet,
    },
];

export default publicRoutes;
