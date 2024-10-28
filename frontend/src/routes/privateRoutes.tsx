import RouteProp from '../interfaces/route';
import MainLayout from '@/layout/admin/MainLayout';
import path from '@/constants/routes';
import Student from '@/views/pages/admin/Student';
import Nhansu from '@/views/pages/admin/Nhansu';


const PrivateRoutes: RouteProp[] = [
  {
    path: '/',
    layout: MainLayout, 
    page: () => <h1>Dashboard</h1>,
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
  {
    path: path.admin.student,
    layout: MainLayout,
    page: Student,
  },
  {
    path: path.admin.nhansu,
    layout: MainLayout,
    page: Nhansu,
  },
];

export default PrivateRoutes;
