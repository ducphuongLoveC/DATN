import { lazy } from 'react';
import MainLayout from '@/layout/admin/MainLayout';
import RouteProp from '../interfaces/route';
import path from '@/constants/routes';
import Loadable from '@/ui-component/Loadable';

const Dashboard = Loadable(lazy(() => import('../views/pages/admin/Home')));
const LearningPathList = Loadable(lazy(() => import('../views/pages/admin/LearningPath/LearningPathList')));
const CoursesList = Loadable(lazy(() => import('../views/pages/admin/Courses/CourseList')));
const NewCourses = Loadable(lazy(() => import('../views/pages/admin/Courses/NewCourse')));
const UpdateCourse = Loadable(lazy(() => import('../views/pages/admin/Courses/UpdateCourse')));
const CategoryList = Loadable(lazy(() => import('../views/pages/admin/ListCategory')));
const ContentList = Loadable(lazy(() => import('../views/pages/admin/Content')));
const AddContent = Loadable(lazy(() => import('../views/pages/admin/Content/AddContent')));

const TransactionHistory = Loadable(lazy(() => import('@/views/pages/admin/Transactions/transactionHistory')));
const Profile = Loadable(lazy(() => import('@/views/pages/admin/Profile/Profile')));

const StudentList = Loadable(lazy(() => import('../views/pages/admin/StudentList')));

const HR = Loadable(lazy(() => import('../views/pages/admin/HR')));

const Category = Loadable(lazy(() => import('../views/pages/admin/Category/Category')));

const Articlecategory = Loadable(lazy(() => import('../views/pages/admin/Category/Articlecategory')));

const UserDetails = Loadable(lazy(() => import('../views/pages/admin/StudentList/UserDetail')));

const ReviewList = Loadable(lazy(() => import('../views/pages/admin/Review/index')));

const Comments = Loadable(lazy(() => import('../views/pages/admin/Comments/index')));

const Coupon = Loadable(lazy(() => import('../views/pages/admin/Coupon/index')));

const CourseStatistics = Loadable(lazy(() => import('../views/pages/admin/Courses/CourseStatistics')));
const CarouselManager = Loadable(lazy(() => import('../views/pages/admin/CarouselManager')));

const PrivateRoutes: RouteProp[] = [
  {
    path: '/',
    layout: MainLayout,
    page: Dashboard,
  },
  {
    path: path.admin.dashboards,
    layout: MainLayout,
    page: Dashboard,
  },
  {
    path: path.admin.LearningPathList,
    layout: MainLayout,
    page: LearningPathList,
  },
  {
    path: path.admin.courses,
    layout: MainLayout,
    page: CoursesList,
  },
  {
    path: path.admin.updateCourse(':id'),
    layout: MainLayout,
    page: UpdateCourse,
  },
  {
    path: path.admin.newCourse,
    layout: MainLayout,
    page: NewCourses,
  },
  {
    path: path.admin.coupon,
    layout: MainLayout,
    page: Coupon,
  },
  {
    path: path.admin.listCategory,
    layout: MainLayout,
    page: CategoryList,
  },
  {
    path: path.admin.listContent,
    layout: MainLayout,
    page: ContentList,
  },
  {
    path: path.admin.addContent,
    layout: MainLayout,
    page: AddContent,
  },
  {
    path: path.admin.profile,
    layout: MainLayout,
    page: Profile,
  },
  {
    path: path.admin.transactionHistory,
    layout: MainLayout,
    page: TransactionHistory,
  },
  {
    path: path.admin.studentList,
    layout: MainLayout,
    page: StudentList,
  },
  {
    path: path.admin.hr,
    layout: MainLayout,
    page: HR,
  },
  {
    path: path.admin.categorys,
    layout: MainLayout,
    page: Category,
  },
  {
    path: path.admin.Articlecategorys,
    layout: MainLayout,
    page: Articlecategory,
  },
  {
    path: path.admin.studentList,
    layout: MainLayout,
    page: StudentList,
  },
  {
    path: path.admin.hr,
    layout: MainLayout,
    page: HR,
  },

  {
    path: path.admin.usersDetail(':id'),
    layout: MainLayout,
    page: UserDetails,
  },

  {
    path: path.admin.reviewList,
    layout: MainLayout,
    page: ReviewList,
  },

  {
    path: path.admin.commentList,
    layout: MainLayout,
    page: Comments,
  },
  {
    path: path.admin.courseStatistics(':id'),
    layout: MainLayout,
    page: CourseStatistics,
  },
  {
    path: path.admin.carousel,
    layout: MainLayout,
    page: CarouselManager,
  },
];

export default PrivateRoutes;
