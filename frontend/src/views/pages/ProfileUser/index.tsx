import Header from '@/layout/client/MainLayout/Header';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProFile: React.FC = () => {
  const theme = useTheme();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3000/users/1').then((response) => {
      setUser(response.data);
    });
    axios.get('http://localhost:3000/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  if (!user) {
    return <div>Chưa tìm thấy dữ liệu</div>;
  }


  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div style={{ background: theme.palette.background.default }}>
      <div className="tw-relative tw-w-full tw-h-48 tw-rounded-md tw-bg-gradient-to-r tw-from-[#00C9FF] tw-to-[#92FE9D]">
        <div className="tw-absolute tw-left-8 tw-bottom-[-80px] tw-flex tw-items-center">
          <img
            src={user.avatar}
            className="tw-w-40 tw-h-40 tw-rounded-full tw-border-8 tw-border-white"
            alt="User Avatar"
          />
          <div className="tw-ml-4 tw-pt-16">
            <h2 className="tw-text-2xl tw-font-bold">{user.name}</h2>
            <p className="tw-text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className="tw-h-24"></div>
      <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
        <div className={`${theme.palette.background.paper}`}>
          <div className="tw-rounded-lg  border-solid border-1 border-sky-500 tw-mb-3">
            <h3 className="tw-font-semibold tw-text-base tw-mb-2 tw-p-2">
              Giới Thiệu
            </h3>
            <p className="tw-text-center">{user.referring}</p>
            <hr className="tw-my-4" />
            <p className="tw-p-4">Thành Viên Của DevShunt {user.memberSince}</p>
          </div>
          <div className="tw-rounded-lg  border-solid border-[0.5px] border-sky-500 tw-mb-3">
            <div className="tw-rounded-lg  border-solid border-1 border-sky-500">
              <h3 className="tw-font-semibold tw-text-base tw-mb-2 tw-p-2">
                Hoạt động gần đây
              </h3>
              <p className=" tw-mb-2 tw-p-2">
                {user.recentActivity || 'Không có hoạt động gần đây'}
              </p>
            </div>
          </div>
        </div>
        <div className="md:tw-col-span-2 tw-rounded-lg  border-solid border-[0.5px] border-sky-500 tw-mb-3">
          <h3 className="tw-font-semibold tw-mb-4 tw-text-lg">
            Các Khóa Học Đã Tham Gia
          </h3>
          <div className="tw-space-y-4">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className={`${theme.palette.background.paper} tw-shadow-md tw-rounded-lg tw-p-4 tw-flex tw-items-center tw-space-x-4`}
              >
                <img
                  src={course.image}
                  alt="Course Thumbnail"
                  className="tw-w-16 tw-h-16 tw-rounded-lg tw-object-cover"
                />
                <div>
                  <h4 className="tw-font-semibold">{course.title}</h4>
                  <p className="tw-text-sm tw-text-gray-500">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="tw-flex tw-justify-between tw-mt-4">
            <button
              className="tw-py-2 tw-px-4 tw-bg-teal-700 tw-text-white tw-rounded-md"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
            <button
              className="tw-py-2 tw-px-4 tw-bg-teal-700 tw-text-white tw-rounded-md"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFile;
