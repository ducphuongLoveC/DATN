import { lazy } from 'react';
import MainLayout from '@/layout/client/MainLayout';
import BannerLayout from '@/layout/client/BannerLayout';
import Loadable from '@/ui-component/Loadable';
import path from '@/constants/routes';

const Home = Loadable(lazy(() => import('@/views/pages/Home')));
const Login3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Login3'))
);
const LogAuth = Loadable(lazy(() => import('@/views/pages/logAuth')));
const Register3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Register3'))
);

const Contact = Loadable(lazy(() => import('@/views/pages/Contact')));
const Baiviet = Loadable(lazy(() => import('@/views/pages/Article')));
const BaivietDetail = Loadable(
  lazy(() => import('@/views/pages/Article_details'))
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
    page: Contact,
  },
  {
    path: path.client.news,
    layout: MainLayout,
    page: Baiviet,
  },
  {
    path: path.client.news_detail,
    layout: MainLayout,
    page: BaivietDetail,
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
];

export default publicRoutes;
