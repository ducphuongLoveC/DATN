import { lazy } from 'react';
import MainLayout from '@/layout/client/MainLayout';
import BannerLayout from '@/layout/client/BannerLayout';
import LearningLayout from '@/layout/client/LearningLayout';
import Loadable from '@/ui-component/Loadable';
import path from '@/constants/routes';

const Home = Loadable(lazy(() => import('@/views/pages/Home')));
const SettingUser = Loadable(lazy(() => import('@/views/pages/SettingUser')));
const ProFile = Loadable(lazy(() => import('@/views/pages/ProfileUser')));
const Login3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Login3'))
);
const LogAuth = Loadable(lazy(() => import('@/views/pages/logAuth')));
const Register3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Register3'))
);

const Learning = Loadable(lazy(() => import('@/views/pages/Learning')));

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
    layout: LearningLayout,
    path: path.client.learning,
    page: Learning,
  },
];

export default publicRoutes;
