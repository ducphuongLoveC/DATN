import { lazy } from 'react';
import MainLayout from '@/layout/client/MainLayout';
import BannerLayout from '@/layout/client/BannerLayout';
import Loadable from '@/ui-component/Loadable';
import path from '@/constants/routes';

const Home = Loadable(lazy(() => import('@/views/pages/Home')));
const SettingUser = Loadable(lazy(() => import('@/views/pages/SettingUser')));
const ProFile = Loadable(lazy(() => import('@/views/pages/ProfileUser')));
const LearningPath = Loadable(lazy(() => import('@/views/pages/learning-path/LearningPath')));
const BackEnd = Loadable(lazy(() => import('@/views/pages/back-end/BackEnd')));
const FrontEnd = Loadable(lazy(() => import('@/views/pages/front-end/FrontEnd')));
const Login3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Login3'))
);
const LogAuth = Loadable(lazy(() => import('@/views/pages/logAuth')));
const Register3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Register3'))
);

import RouteProp from '@/interfaces/route';

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
    path: path.client.log_auth,
    page: LogAuth,
  },
  {
    path: path.client.auth.register,
    layout: MainLayout,
    page: Register3,
  },
  {
    path: path.client.profile,
    layout: MainLayout,
    page: ProFile,
  },
  {
    path: path.client.setting,
    page: SettingUser,
  },
  {
    path:'/learning-path',
    layout: MainLayout,
    page: LearningPath,
  },
  {
    path: 'back-end',
    layout: MainLayout,
    page: BackEnd,
  },
  {
    path: 'front-end',
    layout: MainLayout,
    page: FrontEnd,
  },
];

export default publicRoutes;
