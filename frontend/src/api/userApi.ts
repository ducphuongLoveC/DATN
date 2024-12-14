import axiosInstance from './axiosInstance';

export const getCoursesProgressWithUser = async (user_id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/user/${user_id}/courses`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: { email: string; newPassword: string; confirmPassword: string }) => {
  try {
    const res = await axiosInstance.put('api/user/reset-password', data);
    return res;
  } catch (error) {
    throw error;
  }
};
