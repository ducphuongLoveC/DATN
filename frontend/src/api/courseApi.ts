import axiosInstance from './axiosInstance';
import { Course } from '@/views/pages/admin/Courses/CourseForm';

export const getCourseList = async () => {
  const res = await axiosInstance.get('api/courses/modules-resources');
  return res.data;
};

export const getCourse = async (id: string) => {
  const res = await axiosInstance.get(`api/courses/${id}/modules-resources`);
  return res.data;
};

export const newCourse = async (data: Course) => {
  const res = await axiosInstance.post('api/courses/add-course', data);
  return res.data;
};
export const updateCourse = async (id: string, datas: Course) => {
  const res = await axiosInstance.patch(`api/courses/update-course/${id}`, datas);
  return res.data;
};
