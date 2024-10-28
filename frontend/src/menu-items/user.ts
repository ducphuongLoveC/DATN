// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import path from '@/constants/routes';
const icons = {
  PermIdentityIcon,
};

const User = {
  id: 'user',
  title: 'User',
  caption: 'User Caption',
  type: 'group',
  children: [
    {
      id: 'adminUser',
      title: 'User Manager',
      type: 'collapse',
      icon: icons.PermIdentityIcon,
      children: [
        {
          id: 'userStudent',
          title: 'Student Manager',
          type: 'item',
          url: path.admin.student,
          target: false,
        },
        {
          id: 'userAdmin',
          title: 'Admin Manager',
          type: 'item',
          url: path.admin.nhansu,
          target: false,
        },
      ],
    },
  ],
};


export default User;
