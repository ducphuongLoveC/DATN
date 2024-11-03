// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
import path from '@/constants/routes';
const dashboard = {
  id: 'dashboard',
  title: 'Bảng điều khiển',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Điều khiển',
      type: 'item',
      url: path.admin.dashboards,
      icon: icons.IconDashboard,
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
