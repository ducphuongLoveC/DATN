import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';

const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <div>{children}</div>;
};

export default RedirectIfAuthenticated;
