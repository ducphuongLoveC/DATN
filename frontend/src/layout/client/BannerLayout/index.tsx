import { useTheme, Theme, useMediaQuery } from '@mui/material';
import clsx from 'clsx';

import SideBar from '../MainLayout/SideBar';
import Carousel from '@/components/Carousel';
import Navbar from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';
import Layout from '../Layout.scss.module.scss';

interface BannerLayoutProp {
  children: React.ReactNode;
}

const fakeSlider = [
  {
    _id: '1',
    path: '/reactjs',
    image: '/images/react.png',
    background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
    title: 'Khóa học React JS',
    description:
      'Khóa học React JS từ cơ bản đến nâng cao, giúp bạn xây dựng các ứng dụng web với khả năng tái sử dụng, quản lý trạng thái và xử lý dữ liệu hiệu quả.',
  },
  {
    _id: '2',
    path: '/nodejs',
    image: '/images/nodejs.png',
    background: 'linear-gradient(to right, #FDC830, #F37335)',
    title: 'NodeJS',
    description:
      'Học NodeJS, nắm vững kiến trúc non-blocking, xây dựng API RESTful và quản lý dữ liệu lớn với tốc độ cao, tích hợp với cơ sở dữ liệu như MongoDB, MySQL.',
  },
  {
    _id: '3',
    path: '/vuejs',
    image: '/images/vuejs.png',
    background: 'linear-gradient(to right, #7F00FF, #E100FF)',
    title: 'VueJS',
    description:
      'Tìm hiểu VueJS để xây dựng các ứng dụng web SPA nhanh, mượt mà, và quản lý trạng thái hiệu quả với Vue Router và Vuex.',
  },
  {
    _id: '4',
    path: '/angular',
    image: '/images/angular.png',
    background: 'linear-gradient(to right, #FF512F, #DD2476)',
    title: 'Angular',
    description:
      'Trở thành chuyên gia Angular, sử dụng TypeScript để phát triển ứng dụng với hiệu suất cao, tối ưu hóa và dễ bảo trì.',
  },
  {
    _id: '5',
    path: '/javascript',
    image: '/images/javascript-banner.png',
    background: 'linear-gradient(to right, #FFE000, #799F0C)',
    title: 'JavaScript',
    description:
      'Nắm vững JavaScript từ cơ bản đến nâng cao, bao gồm lập trình bất đồng bộ và tối ưu hóa hiệu suất trên cả front-end và back-end.',
  },
  {
    _id: '6',
    path: '/python',
    image: '/images/python-banner.png',
    background: 'linear-gradient(to right, #00B4DB, #0083B0)',
    title: 'Python',
    description:
      'Học Python cho phát triển web, khoa học dữ liệu và tự động hóa, xây dựng ứng dụng với Django hoặc Flask, phân tích dữ liệu hiệu quả.',
  },
  {
    _id: '7',
    path: '/ruby',
    image: '/images/ruby-banner.png',
    background: 'linear-gradient(to right, #FF416C, #FF4B2B)',
    title: 'Ruby',
    description:
      'Khám phá Ruby và Rails để phát triển ứng dụng web mạnh mẽ, tối ưu hóa và dễ bảo trì với hiệu suất cao.',
  },
  {
    _id: '8',
    path: '/php',
    image: '/images/php-banner.png',
    background: 'linear-gradient(to right, #1D976C, #93F9B9)',
    title: 'PHP',
    description:
      'Học PHP để xây dựng ứng dụng web server-side mạnh mẽ, kết nối cơ sở dữ liệu, xử lý yêu cầu HTTP và bảo mật cao.',
  },
  {
    _id: '9',
    path: '/golang',
    image: '/images/golang-banner.png',
    background: 'linear-gradient(to right, #36D1DC, #5B86E5)',
    title: 'Golang',
    description:
      'Thành thạo Go để xây dựng hệ thống đa luồng, xử lý nhiều kết nối và tối ưu hóa mã cho hiệu suất cao.',
  },
  {
    _id: '10',
    path: '/java',
    image: '/images/java-banner.png',
    background: 'linear-gradient(to right, #FFB75E, #ED8F03)',
    title: 'Java',
    description:
      'Trở thành chuyên gia Java, phát triển ứng dụng doanh nghiệp, hệ thống lớn và phần mềm di động với Java Spring.',
  },
];

const BannerLayout: React.FC<BannerLayoutProp> = ({ children }) => {
  const theme: Theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div
      style={{
        background: theme.palette.background.paper,
      }}
    >
      {/* header */}
      <Navbar />

      <div
        style={{
          background: theme.palette.background.paper,
        }}
        className="tw-flex"
      >
        <SideBar />
        <div className={clsx(Layout['content-main'], downMD ? 'tw-px-2' : '')}>
          <Carousel dot auto time={4000} sliders={fakeSlider} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BannerLayout;
