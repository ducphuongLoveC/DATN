import MainLayout from '@/layout/client/MainLayout';
import Home from '@/views/pages/Home';
import RouteProp from '../interfaces/route';
import Login3 from '@/views/pages/authentication3/Login3';
import Register3 from '@/views/pages/authentication3/Register3';

import path from '@/constants/routes';

const publicRoutes: RouteProp[] = [
    {
        path: '/',
        layout: MainLayout,
        page: Home,
    },
    {
        path: path.client.contact,
        layout: MainLayout,
        page: Home,
    },
    {
        path: path.client.news,
        layout: MainLayout,
        page: Home,
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
];

export default publicRoutes;
