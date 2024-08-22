import Header from '@/layout/client/MainLayout/Header';

import CourseCardLayouts from '@/components/CardLayouts';
import Carousel from '@/components/Carousel';
import { useTheme } from '@emotion/react';

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

            <CourseCardLayouts />
        </div>
    );
};
export default Home;
