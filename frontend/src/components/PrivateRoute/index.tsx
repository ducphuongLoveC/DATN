import { Navigate, Outlet } from 'react-router-dom';

import RouteProp from '@/interfaces/route';
interface PrivateRouteProps {
  roles: string[];
  routes: RouteProp[];
}

const PrivateRoute = ({ roles, routes }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token || !roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
