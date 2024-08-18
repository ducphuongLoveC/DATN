import Header from '@/layout/client/MainLayout/Header';

import CourseCardLayouts from '@/components/CardLayouts';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <span className="tw-font-bold tw-text-2xl tw-text-gray-700 tw-px-4 tw-py-2">
                Khóa học mới nhất
            </span>

            <CourseCardLayouts />
            <div>Home</div>
        </div>
    );
};
export default Home;





