import {
  BiSolidHome,
  BiNews,
  BiLogoTelegram,
  BiSolidObjectsHorizontalLeft,
  BiLaptop,
} from 'react-icons/bi';

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
    icon: BiSolidObjectsHorizontalLeft,
    title: 'Lộ trình',
    url: '/learning-path',
    target: false,
  },
  {
    icon: BiNews,
    title: 'Bài viết',
    url: path.client.news,
    target: false,
  },
  {
    icon: BiLogoTelegram,
    title: 'Liên hệ',
    url: '/contact',
    target: false,
  },
  {
    icon: BiLaptop,
    title: 'test learning',
    url: '/learning',
    target: false,
  },
];
export default menus;
