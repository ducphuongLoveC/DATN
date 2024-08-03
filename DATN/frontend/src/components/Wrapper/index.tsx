import clsx from 'clsx';
import s from './Wrapper.module.scss';

interface WrapperProps {
    style?: any
    children: React.ReactNode
}
const Wrapper: React.FC<WrapperProps> = ({ children, ...props }) => {

    return (
        <div className={clsx(s['wrapper'])} {...props}>
            {
                children
            }
        </div>
    )
}
export default Wrapper;