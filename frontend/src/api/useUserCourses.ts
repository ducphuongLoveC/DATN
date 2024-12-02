import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

export const useUserCourses = (userId: string | null) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchUserCourses = async () => {
        try {
          const response = await axiosInstance.get(`/api/user/${userId}/courses`);
          if (response.status === 200) {
            setCourses(response.data.courses || []);
            setCoursesError(null);
          } else {
            setCoursesError("Người dùng này chưa đăng ký khóa học nào.");
            setCourses([]);
          }
        } catch (error) {
          setCoursesError("Lỗi khi lấy danh sách khóa học.");
        }
      };
      fetchUserCourses();
    }
  }, [userId]);

  return { courses, coursesError };
};