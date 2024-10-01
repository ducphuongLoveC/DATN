import Header from './Header';
import ImageDescription from './imageDescription';
import { Box } from '@mui/material';

interface ContainerProp {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProp> = ({ children }) => {
  return <Box>{children}</Box>;
};
const Dropdown: any = {
  Container,
  Header,
  ImageDescription,
};
export default Dropdown;
