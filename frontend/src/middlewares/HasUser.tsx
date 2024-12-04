import { RootState } from '@/store/reducer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
interface HasUserProp {
  children: React.ReactNode;
}

const HasUser: React.FC<HasUserProp> = ({ children }) => {
  const user = useSelector((state: RootState) => state.authReducer.user);

  if (!user) return <Navigate to={'/auth/login'} />;
  return <>{children}</>;
};

export default HasUser;
