import { Fragment, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import RouteProp from '@/interfaces/route';

import mainRoutes from './mainRoutes';
import privateRoutes from './privateRoutes';
import subDomainRouter from '../helpers/subDomainRouter';

import subRouterProp from '@/interfaces/sub';
import getMainDomain from '@/utils/getMainDoumain';
const createRoutes = (routes: RouteProp[]) => {
  const renderRoutes = (routes: RouteProp[]) => {
    return routes.map((route, index) => {
      const Layout: any = route.layout || Fragment;
      const Page = route.page;

      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <Page />
              </Suspense>
            </Layout>
          }
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return (
    <Router>
      <Routes>
        {renderRoutes(routes)}
        {!getMainDomain().url.hostname.includes('admin') && (
          <Route path="*" element={<h1>Không thể tìm thấy trang này</h1>} />
        )}
      </Routes>
    </Router>
  );
};


const authenticateUser = () => {
  const token = localStorage.getItem('token');
  return true;
  if (!token) {
    window.location.href = `${getMainDomain().link}log_auth`;
    return false;
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
