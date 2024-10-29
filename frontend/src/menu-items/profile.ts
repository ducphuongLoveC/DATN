// assets
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import path from '@/constants/routes';
const icons = {
  AccountCircleIcon,
};

const Profile = {
  id: 'profile',
  title: 'profile',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'collapse',
      icon: icons.AccountCircleIcon,

      children: [
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          url: path.admin.profile,
          target: false,
        },
      ],
    },
  ],
};

export default Profile;
