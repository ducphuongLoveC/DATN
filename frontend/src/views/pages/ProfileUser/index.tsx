import axiosInstance from '@/api/axiosInstance';
import { useUserCourses } from '@/api/useUserCourses';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import s from './index.module.scss';
import { PersonPinCircleRounded } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';

const ProFile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromURL = queryParams.get('id');  // Lấy ID từ URL
  const navigate = useNavigate(); // Initialize useNavigate

  const { courses, coursesError } = useUserCourses(userIdFromURL);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null); // Thêm state để lưu lỗi

  // Log userId để kiểm tra
  console.log("User ID from URL:", userIdFromURL);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userIdFromURL) {
        try {
          const response = await axiosInstance.get(`/api/user/${userIdFromURL}`);
          if (response.status === 200) {
            if (response.data.data) {
              setUser(response.data.data);  // Đã có dữ liệu người dùng
              setError(null);  // Xóa lỗi nếu có
            } else {
              setError("Không tìm thấy người dùng với ID này.");  // Nếu không có dữ liệu
            }
          } else {
            setError("Không tìm thấy người dùng với ID này.");  // Nếu response không phải 200
          }
        } catch (error) {
          setError("Lỗi khi lấy thông tin người dùng.");
        }
      }
    };
    fetchUserInfo();
  }, [userIdFromURL]);

  useEffect(() => {
    console.log("Current user data:", user);
  }, [user]);

  // Nếu có lỗi, chuyển hướng đến trang 404
  useEffect(() => {
    if (error) {
      navigate('/notfound');  // Chuyển hướng đến trang 404 khi có lỗi
    }
  }, [error, navigate]);

  // Nếu không có userId từ URL
  if (!userIdFromURL) {
    return <div>ID không hợp lệ!</div>;
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={clsx(s["main-profileUser"])}>

      {/* Banner */}
      <div className={clsx(s["banner-profileUser"])} >
        <img src="https://fullstack.edu.vn/assets/cover-profile-CDYcrPwJ.png" alt="Banner" />
      </div>

      {/* Avatar và tên */}
      <div className={clsx(s["box-avatar-name"])}>

        <div className={clsx(s["avatar-profileUser"])} >
          <img src={user?.profile_picture || "default-avatar.png"} alt="Avatar" />
        </div>
        <span className={clsx(s["name-profileProfile"])}>{user?.name || "Tên người dùng"}</span>
      </div>

      {/* Nội dung */}
      <div className={clsx(s["container-profileUser"])}>

        {/* Cột trái */}
        <div className={clsx(s["column-left"])}>

          <div className={clsx(s["box-top"])} >
            <h4 className={clsx(s["h4-title"])} >Giới thiệu</h4>
            <div className={clsx(s["box-icon-name"])} >
              <PersonPinCircleRounded />
              <span>
                Thành viên của Ftech - Ngày tham gia:{" "}
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Chưa có thông tin"}
              </span>
            </div>
          </div>
          <div className={clsx(s["box-bottom"])} >
            <h4 className={clsx(s["h4-title"])} >Hoạt động gần đây</h4>
            <div className={clsx(s["box-icon-name"])} >Chưa có hoạt động gần đây</div>
          </div>
        </div>

        {/* Cột phải */}
        <div className={clsx(s["column-right"])} >
          <h6 className={clsx(s["h5-title"])} >Các khóa học đã tham gia</h6>
          {coursesError && <div>{coursesError}</div>}
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className={clsx(s["box-small-right"])} >
                <div className={clsx(s["thumbnail-img"])} >
                  <img src={course.thumbnail} alt={course.title} />
                </div>
                <div className={clsx(s["div-Info"])} >
                  <h3 className={clsx(s["info-title"])} >
                    <a href="#">{course.title}</a>
                  </h3>
                  <p className={clsx(s["info-desc"])} >
                    <p dangerouslySetInnerHTML={{ __html: truncateText(course.description, 70) }} />
                  </p>
                  <p className={clsx(s["info-progress"])} >Tiến độ: {course.progress}%</p>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress || 0}
                    sx={{
                      height: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": { backgroundColor: "#76c7c0" },
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>Không có khóa học nào</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProFile;
