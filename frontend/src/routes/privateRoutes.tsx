import RouteProp from '../interfaces/route';
import MainLayout from '@/layout/admin/MainLayout';
import path from '@/constants/routes';
import Loadable from '@/ui-component/Loadable';
import { lazy } from 'react';

const Dashboard = Loadable(lazy(() => import('@/views/pages/admin/Home')));
const PrivateRoutes: RouteProp[] = [
  {
    path: '/',
    layout: MainLayout,
    page: Dashboard,
  },
  {
    path: path.admin.dashboards,
    layout: MainLayout,
    page: () => <h1>Dashboard</h1>,
  },
  {
    path: path.admin.courses,
    layout: MainLayout,
    page: () => <h1>Manage Courses</h1>,
  },
  {
    path: path.admin.newCourse,
    layout: MainLayout,
    page: () => <h1>Create Course</h1>,
  },
  {
    path: path.admin.posts,
    layout: MainLayout,
    page: () => <h1>Manage Posts</h1>,
  },
  {
    path: path.admin.newPosts,
    layout: MainLayout,
    page: () => <h1>Create Post</h1>,
  },
  {
    path: path.admin.transaction,
    layout: MainLayout,
    page: () => <h1>Transactions</h1>,
  },
  {
    path: path.admin.transactionHistory,
    layout: MainLayout,
    page: () => <h1>Transaction History</h1>,
  },
  {
    path: path.admin.statistics,
    layout: MainLayout,
    page: () => <h1>Statistics</h1>,
  },
  {
    path: path.admin.profiles,
    layout: MainLayout,
    page: () => <h1>Admin Profiles</h1>,
  },
];

export default PrivateRoutes;
