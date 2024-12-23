import {
  BiSolidHome,
  // BiNews,
  BiLogoTelegram,
} from 'react-icons/bi';

import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import path from '@/constants/routes';

export interface Props {
  icon: React.ReactNode | Function;
  title: string;
  url: string;
  target: boolean;
}

const menus: Props[] = [
  {
    icon: BiSolidHome,
    title: 'Home',
    url: '/',
    target: false,
  },
  {
    icon: VideoLibraryIcon,
    title: 'My courses',
    url: path.client.myCourses,
    target: false,
  },
  // {
  //   icon: BiNews,
  //   title: 'Bài viết',
  //   url: path.client.news,
  //   target: false,
  // },
  {
    icon: BiLogoTelegram,
    title: 'Liên hệ',
    url: '/contact',
    target: false,
  },
];
export default menus;
