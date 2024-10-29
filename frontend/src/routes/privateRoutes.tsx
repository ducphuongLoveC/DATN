import MainLayout from '@/layout/admin/MainLayout';

import RouteProp from '../interfaces/route';
import path from '@/constants/routes';

import Loadable from '@/ui-component/Loadable';
import { lazy } from 'react';

const LearningPathList = Loadable(
  lazy(() => import('../views/pages/admin/LearningPath/LearningPathList'))
);
const NewLearningPath = Loadable(
  lazy(() => import('../views/pages/admin/LearningPath/NewLearningPath'))
);
const NewCourses = Loadable(
  lazy(() => import('../views/pages/admin/Courses/NewCourse'))
);
const UpdateCourse = Loadable(
  lazy(() => import('../views/pages/admin/Courses/UpdateCourse'))
);
const CourseList = Loadable(
  lazy(() => import('../views/pages/admin/Courses/CourseList'))
);

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
    page: CourseList,
  },
  {
    path: path.admin.LearningPathList,
    layout: MainLayout,
    page: LearningPathList,
  },
  {
    path: path.admin.newLearningPath,
    layout: MainLayout,
    page: NewLearningPath,
  },
  {
    path: path.admin.updateCourse,
    layout: MainLayout,
    page: UpdateCourse,
  },
  {
    path: path.admin.newCourse,
    layout: MainLayout,
    page: NewCourses,
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
