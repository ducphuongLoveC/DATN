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
import Cookies from 'js-cookie';
const createRoutes = (routes: RouteProp[]) => {
  return (
    <Router>
      <ResetScroll />
      <Routes>
        {routes.map((route, index) => {
          const Middlewares = route.middleware || [];
          const Layout = route.layout || Fragment;
          const Page = route.page;
          const WrappedPage = Middlewares.reduceRight(
            (child, Middleware) => <Middleware>{child}</Middleware>,
            <Page />
          );
          return <Route key={index} path={route.path} element={<Layout>{WrappedPage}</Layout>} />;
        })}
        {!getMainDomain().url.hostname.includes('admin') && <Route path="*" element={<NotFound />} />}
      </Routes>
    </Router>
  );
};

const subRouter: subRouterProp[] = [
  {
    sub: 'admin',
    routes: privateRoutes,
    isAuthentication: true,
    handleAuthentication: () => {
      const params = new URLSearchParams(window.location.search);

      const info = params.get('info');
      const accessToken = params.get('accessToken');

      let user;

      if (info) {
        user = JSON.parse(decodeURIComponent(info));
      }
      if (Cookies.get('user') && Cookies.get('accessToken')) {
        return true;
      }
      if (user && accessToken && user.role === 'admin') {
        Cookies.set('user', info || '', { domain: 'admin.localhost', expires: 7 });
        Cookies.set('accessToken', accessToken || '', { domain: 'admin.localhost', expires: 7 });

        return true;
      }
      window.location.href = import.meta.env.VITE_URL_MAIN + 'log-auth';
      return false;
    },
  },
];

const router = createRoutes(subDomainRouter(subRouter, mainRoutes));
export { router };
