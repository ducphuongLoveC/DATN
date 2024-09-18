import Header from '@/layout/client/MainLayout/Header';

import CourseCardLayouts from '@/components/CardLayouts';
import Carousel from '@/components/Carousel';
import { useTheme } from '@emotion/react';
import { BiPlay } from 'react-icons/bi';

const Home: React.FC = () => {
    const theme: any = useTheme();

    return (
        <div>
            <span
                className="tw-font-bold tw-text-2xl tw-px-4 tw-py-2"
                style={{
                    color: theme.palette.text.primary,
                }}
            >
                Khóa học mới nhất
            </span>

            {/* <h2 className="tw-bg-gradient-to-r tw-from-[#00C9FF] tw-to-[#92FE9D] tw-text-white tw-px-5 tw-py-2 tw-rounded-md" style={{height: '100px', borderRadius: '45%', width: '100px', display: 'flex', alignItems: 'center', justifyContent:"center", fontSize: '25px', fontFamily: 'fantasy'}}>FTECH <BiPlay></BiPlay></h2> */}
            
            

            <CourseCardLayouts />
        </div>
    );
};
export default Home;
