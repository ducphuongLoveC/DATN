import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                    const Layout = route.layout ? route.layout : Fragment;
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
                <Route path="*" element={<h1>Không thể tìm thấy trang này</h1>} />
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
            // xử lí logic 
            return true
        }
    }
]

const router = createRoutes(subDomainRouter(subRouter, mainRoutes));
export { router };
