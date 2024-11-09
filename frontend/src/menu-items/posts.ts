// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const posts = {
  id: 'posts',
  title: 'Posts',
  type: 'group',
  children: [
    {
      id: 'post',
      title: 'Quản lý bài viết',
      type: 'collapse',
      icon: icons.IconDashboard,
      breadcrumbs: true,
      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true,
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true,
        },
      ],
    },
  ],
};

export default posts;
