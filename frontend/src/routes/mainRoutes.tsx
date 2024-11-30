import { lazy } from 'react';
// layout
import MainLayout from '@/layout/client/MainLayout';
import BannerLayout from '@/layout/client/BannerLayout';
import LearningLayout from '@/layout/client/LearningLayout';
import BasicLayout from '@/layout/client/BasicLayout';

import Loadable from '@/ui-component/Loadable';
import path from '@/constants/routes';

// mid
import RedirectIfAuthenticated from '@/middlewares/RedirectIfAuthenticated';
import HasAccess from '@/middlewares/HasAccess';

const Home = Loadable(lazy(() => import('@/views/pages/Home')));
const SettingUser = Loadable(lazy(() => import('@/views/pages/SettingUser')));
const ProFile = Loadable(lazy(() => import('@/views/pages/ProfileUser')));
const LearningPath = Loadable(
  lazy(() => import('@/views/pages/LearningPath/LearningPath'))
);
const LearningPathDetail = Loadable(
  lazy(() => import('@/views/pages/LearningPathDetail/LearningPathDetail'))
);
const Login3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Login3'))
);
const LogAuth = Loadable(lazy(() => import('@/views/pages/logAuth')));
const Register3 = Loadable(
  lazy(() => import('@/views/pages/authentication3/Register3'))
);
const Contact = Loadable(lazy(() => import('@/views/pages/Contact')));
const PostOverview = Loadable(lazy(() => import('@/views/pages/PostOverview')));
const PostDetail = Loadable(lazy(() => import('@/views/pages/PostDetail')));
//learning
const Learning = Loadable(lazy(() => import('@/views/pages/Learning')));
const CourseDetail = Loadable(lazy(() => import('@/views/pages/CourseDetail')));
//posts route
const NewPost = Loadable(lazy(() => import('@/views/pages/Post/NewPost')));
const Certificate = Loadable(
  lazy(() => import('@/views/pages/cetificate/Cetificate'))
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
    page: PostOverview,
  },
  {
    path: path.client.newsDetail,
    layout: MainLayout,
    page: PostDetail,
  },
  {
    middleware: RedirectIfAuthenticated,
    path: path.client.auth.login,
    layout: MainLayout,
    page: Login3,
  },
  {
    middleware: RedirectIfAuthenticated,
    path: path.client.logAuth,
    page: LogAuth,
  },
  {
    middleware: RedirectIfAuthenticated,
    path: path.client.auth.register,
    layout: MainLayout,
    page: Register3,
  },
  {
    middleware: HasAccess,
    layout: LearningLayout,
    path: path.client.learning,
    page: Learning,
  },
  {
    layout: MainLayout,
    path: path.client.learningPath,
    page: LearningPath,
  },
  {
    layout: MainLayout,
    path: path.client.learningPathDetail,
    page: LearningPathDetail,
  },
  {
    layout: MainLayout,
    path: path.client.courses,
    page: CourseDetail,
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
    layout: BasicLayout,
    path: path.client.newPost,
    page: NewPost,
  },
  {
    path: path.client.certificate,
    page: Certificate,
  },
];

export default publicRoutes;
