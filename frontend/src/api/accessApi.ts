import axiosInstance from './axiosInstance';

export const hasAccess = async (user_id: string, course_id: string) => {
  try {
    const res = await axiosInstance.get(`/api/access/check/${user_id}/${course_id}`);
    return res.data;
  } catch (error) {
    return { hasAccess: false, message: 'Failed to verify access' };
  }
};

export const createAccess = async ({ user_id, course_id }: { user_id: string; course_id: string }) => {
  try {
    const res = await axiosInstance.post('api/access/', { user_id, course_id });
    console.log('API response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error in API:', error);
    throw error;
  }
};
