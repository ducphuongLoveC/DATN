import { Fragment } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteProp from '@/interfaces/route';

import mainRoutes from './mainRoutes';
import privateRoutes from './privateRoutes';
import subDomainRouter from '../helpers/subDomainRouter';

import subRouterProp from '@/interfaces/sub';
import getMainDomain from '@/utils/getMainDoumain';
import NotFound from '@/views/pages/NotFound';
import ResetScroll from '@/components/ResetScroll';
const createRoutes = (routes: RouteProp[]) => {
  return (
    <Router>
      <ResetScroll />
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
        {!getMainDomain().url.hostname.includes('admin') && (
          <Route path="*" element={<NotFound />} />
        )}
      </Routes>
    </Router>
  );
};

const authenticateUser = () => {
  const token = localStorage.getItem('authToken');
  return true;
  if (!token) {
    window.location.href = `${getMainDomain().link}log-auth`;
    return false;
  }
};

const subRouter: subRouterProp[] = [
  {
    sub: 'admin',
    routes: privateRoutes,
    isAuthentication: true,
    handleAuthentication: () => {
      return authenticateUser();
    },
  },
];

const router = createRoutes(subDomainRouter(subRouter, mainRoutes));
export { router };
