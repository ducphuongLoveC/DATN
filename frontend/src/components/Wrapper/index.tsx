import clsx from 'clsx';
import s from './Wrapper.module.scss';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx(s['wrapper'], className)} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;
