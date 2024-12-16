import axiosInstance from '@/api/axiosInstance';
import { useUserCourses } from '@/api/useUserCourses';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './index.module.scss';
import { PersonPinCircleRounded } from '@mui/icons-material';
import Progress from '@/components/Progress';
import useQueryParams from '@/hooks/useQueryParams';

// icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { User } from '@/store/authReducer';

const ProFile = () => {
  const query = useQueryParams();
  const userIdFromURL = query.get('id');
  console.log(userIdFromURL);
  
  const navigate = useNavigate();

  const { courses, coursesError } = useUserCourses(userIdFromURL);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log('User ID from URL:', userIdFromURL);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userIdFromURL) {
        try {
          const response = await axiosInstance.get(`/api/user/${userIdFromURL}`);
          // console.log(response.data)
          if (response.status === 200) {
            if (response.data.data) {
              setUser(response.data.data);
              setError(null);
            } else {
              setError('Không tìm thấy người dùng với ID này.');
            }
          } else {
            setError('Không tìm thấy người dùng với ID này.');
          }
        } catch (error) {
          setError('Lỗi khi lấy thông tin người dùng.');
        }
      }
    };
    fetchUserInfo();
  }, [userIdFromURL]);

  useEffect(() => {
    console.log('Current user data:', user);
  }, [user]);

  useEffect(() => {
    if (error) {
      navigate('/notfound');
    }
  }, [error, navigate]);

  if (!userIdFromURL) {
    return <div>ID không hợp lệ!</div>;
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className={clsx(s['main-profileUser'])}>
      <div className={clsx(s['banner-profileUser'])}>
        <img src="/images/banner-user.png" alt="Banner" />
      </div>

      <div className={clsx(s['box-avatar-name'])}>
        <div className={clsx(s['avatar-profileUser'])}>
          <img src={user?.profile_picture || 'default-avatar.png'} alt="Avatar" />
        </div>
        <span className={clsx(s['name-profileProfile'])}>
          {user?.name || 'Tên người dùng'}
          {user?.role === 'admin' && <CheckCircleIcon sx={{ fontSize: 'var(--medium-icon)', color: 'primary.main', ml: 1 }} />}
        </span>
      </div>

      {/* Nội dung */}
      <div className={clsx(s['container-profileUser'])}>
        {/* Cột trái */}
        <div className={clsx(s['column-left'])}>
          <div className={clsx(s['box-top'])}>
            <h4 className={clsx(s['h4-title'])}>Giới thiệu</h4>
            <div className={clsx(s['box-icon-name'])}>
              <span>Biệt danh: {user?.referring}</span>
              <br />
              <PersonPinCircleRounded />

              <span>
                Thành viên của Ftech - Ngày tham gia:{' '}
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Chưa có thông tin'}
              </span>
            </div>
          </div>
          <div className={clsx(s['box-bottom'])}>
            <h4 className={clsx(s['h4-title'])}>Hoạt động gần đây</h4>
            <div className={clsx(s['box-icon-name'])}>Chưa có hoạt động gần đây</div>
          </div>
        </div>

        {/* Cột phải */}
        <div className={clsx(s['column-right'])}>
          <h6 className={clsx(s['h5-title'])}>Các khóa học đã tham gia</h6>
          {coursesError && <div>{coursesError}</div>}
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className={clsx(s['box-small-right'])}>
                <div className={clsx(s['thumbnail-img'])}>
                  <img src={course.thumbnail} alt={course.title} />
                </div>
                <div className={clsx(s['div-Info'])}>
                  <h3 className={clsx(s['info-title'])}>
                    <a href="#">{course.title}</a>
                  </h3>
                  <p className={clsx(s['info-desc'])}>
                    <p dangerouslySetInnerHTML={{ __html: truncateText(course.description, 70) }} />
                  </p>
                  <p className={clsx(s['info-progress'])}>Tiến độ: {course.progress}%</p>
                  <Progress value={course.progress || 0} />
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
