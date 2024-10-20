import { Suspense, ComponentType } from 'react';

// Project imports
import Loader from './Loader';

// Define the type for the Loadable component
const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
