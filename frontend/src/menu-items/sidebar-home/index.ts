import {
  BiSolidHome,
  BiNews,
  BiLogoTelegram,
  BiSolidObjectsHorizontalLeft,
} from 'react-icons/bi';

import { FaRoad } from 'react-icons/fa6';

console.log(FaRoad);
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
];
export default menus;
