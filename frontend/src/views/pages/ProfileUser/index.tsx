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
      {/* Header Section */}
      <div className="tw-relative tw-w-full tw-h-48 tw-rounded-md tw-bg-gradient-to-r tw-from-[#00C9FF] tw-to-[#92FE9D]">
        <div className="tw-absolute tw-left-8 tw-bottom-[-80px] tw-flex tw-items-center">
          <img
            src={user.avatar}
            className="tw-w-40 tw-h-40 tw-rounded-full tw-border-8 tw-border-white"
            alt="User Avatar"
          />
          <div className="tw-ml-4 tw-pt-16">
            <h6 className="tw-text-2xl tw-font-bold">{user.name}</h6>
            <p className="tw-text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="tw-container tw-mx-auto tw-my-8 tw-px-4">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
          {/* User Info Section */}
          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-6">
            <h3 className="tw-font-semibold tw-text-lg tw-mb-4">Giới Thiệu</h3>
            <p className="tw-text-center tw-text-gray-700">{user.referring}</p>
            <hr className="tw-my-4" />
            <p className="tw-p-2 tw-text-gray-500">Thành Viên Của DevShunt ngày {user.memberSince}</p>
          </div>

          {/* Recent Activity Section */}
          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-6">
            <h3 className="tw-font-semibold tw-text-lg tw-mb-4">Hoạt Động Gần Đây</h3>
            <p className="tw-text-gray-700">{user.recentActivity || 'Không có hoạt động gần đây'}</p>
          </div>

          {/* Courses Section */}
          <div className="md:tw-col-span-2 tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-6">
            <h3 className="tw-font-semibold tw-text-lg tw-mb-4">Các Khóa Học Đã Tham Gia</h3>
            <div className="tw-space-y-4">
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="tw-bg-gray-100 tw-shadow-md tw-rounded-lg tw-p-4 tw-flex tw-items-center tw-space-x-4"
                >
                  <img
                    src={course.image}
                    alt="Course Thumbnail"
                    className="tw-w-16 tw-h-16 tw-rounded-lg tw-object-cover"
                  />
                  <div>
                    <h6 className="tw-font-semibold">{course.title}</h6>
                    <p className="tw-text-sm tw-text-gray-500">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Section */}
            <div className="tw-flex tw-justify-between tw-mt-6">
              <button
                className="tw-py-2 tw-px-4 tw-bg-teal-700 tw-text-white tw-rounded-md hover:tw-bg-teal-800"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trước
              </button>
              <span className="tw-text-gray-700">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                className="tw-py-2 tw-px-4 tw-bg-teal-700 tw-text-white tw-rounded-md hover:tw-bg-teal-800"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFile;
