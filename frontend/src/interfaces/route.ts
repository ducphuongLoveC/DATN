interface RouteProp {
  path: string;
  layout?: React.ComponentType | Function;
  page: React.ComponentType;
  isPrivate?: boolean;
  children?: RouteProp[];
}
export default RouteProp;
