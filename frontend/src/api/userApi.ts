import axiosInstance from './axiosInstance';

export const getCoursesProgressWithUser = async (user_id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/user/${user_id}/courses`);
    return data;
  } catch (error) {
    throw error;
  }
};
