interface RouteProp {
  path: string;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  page: React.ComponentType;
  middleware?: React.ComponentType<{ children: React.ReactNode }>[];
  isPrivate?: boolean;
  children?: RouteProp[];
}
export default RouteProp;
