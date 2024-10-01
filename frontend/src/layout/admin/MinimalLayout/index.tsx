import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout: React.FC = () => (
  <>
    <Outlet />
    <Customization />
  </>
);

export default MinimalLayout;
