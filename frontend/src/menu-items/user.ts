// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import path from '@/constants/routes';
const icons = {
  PermIdentityIcon,
};

const user = {
  id: 'user',
  title: 'User',
  caption: 'User Caption',
  type: 'group',
  children: [
    {
      id: 'adminUser',
      title: 'Quản lý tài khoản',
      type: 'collapse',
      icon: icons.PermIdentityIcon,
      children: [
        {
          id: 'userStudent',
          title: 'Học viên',
          type: 'item',
          url: path.admin.studentList,
          target: false,
        },
        {
          id: 'userAdmin',
          title: 'Quản trị',
          type: 'item',
          url: path.admin.hr,
          target: false,
        },
      ],
    },
  ],
};


export default user;
