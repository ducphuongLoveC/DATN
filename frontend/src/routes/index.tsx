import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RouteProp from '@/interfaces/route';

import mainRoutes from './mainRoutes';
import privateRoutes from './privateRoutes';
import subDomainRouter from '../helpers/subDomainRouter';

import subRouterProp from '@/interfaces/sub';

const createRoutes = (routes: RouteProp[]) => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Layout: any = route.layout || Fragment;
          const Page = route.page;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {/* Định tuyến cho các trang không tìm thấy */}
        <Route path="*" element={<h1>Không thể tìm thấy trang này</h1>} />
      </Routes>
    </Router>
  );
};

const authenticateUser = () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    alert('Bạn cần đăng nhập để truy cập');
    return false; 
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); 
    const userRole = decodedToken.role;

    if (userRole !== 'admin') {
      alert('Bạn không có quyền truy cập vào khu vực này');
      return false; // Nếu role không phải là admin thì không cho truy cập
    }

    return true; // Xác thực thành công
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error);
    return false; // Nếu có lỗi khi giải mã token
  }
};

const subRouter: subRouterProp[] = [
  {
    sub: 'admin',
    routes: privateRoutes,
    isAuthentication: true,
    handleAuthentication: () => {
      return authenticateUser(); // Gọi hàm xác thực
    },
  },
];

const router = createRoutes(subDomainRouter(subRouter, mainRoutes));
export { router };
