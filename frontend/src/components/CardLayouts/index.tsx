import clsx from 'clsx';
import CardMain from '../CardMain';


import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import s from './CardMain.module.scss';


const CourseCardLayouts: React.FC = () => {
    return (
        <div className={clsx(s['list-course'])}>
            <CardMain
                title='Javascript cơ bản'
                img='https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain'
                footerIcon={[
                    {
                        title: '3,456',
                        icon: <VisibilityIcon />
                    },
                    {
                        title: 'Jul 26, 2019',
                        icon: <CalendarTodayIcon />
                    }
                ]}
            />

            <CardMain
                title='Javascript cơ bản'
                img='https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain'
                footerIcon={[
                    {
                        title: '3,456',
                        icon: <VisibilityIcon />
                    },
                    {
                        title: 'Jul 26, 2019',
                        icon: <CalendarTodayIcon />
                    }
                ]}
            />

        </div>
    );
};
export default CourseCardLayouts;
