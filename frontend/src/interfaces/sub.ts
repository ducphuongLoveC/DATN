import RouteProp from './route';

interface subRouterProp {
  sub: string;
  routes: RouteProp[];
  isAuthentication: boolean;
  handleAuthentication?: Function;
}
export default subRouterProp;
