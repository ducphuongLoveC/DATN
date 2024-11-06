interface RouteProp {
  path: string;
  layout?: React.ComponentType | Function;
  page: React.ComponentType;
  middleware?: React.ComponentType<{ children: React.ReactNode }>; 
  isPrivate?: boolean;
  children?: RouteProp[];
}
export default RouteProp;
