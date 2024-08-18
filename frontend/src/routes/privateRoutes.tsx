import React from 'react';
import { Navigate } from 'react-router-dom';
import RouteProp from '../interfaces/route';

import MainLayout from '@/layout/admin/MainLayout';

const PrivateRoutes: RouteProp[] = [
    {
        path: '/',
        layout: MainLayout,
        page: () => <h1>admin</h1>,
    },
    {
        path: '/course',
        page: () => <h1>courseAdmin</h1>,
    },
];

export default PrivateRoutes;
