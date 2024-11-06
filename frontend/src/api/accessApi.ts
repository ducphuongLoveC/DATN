import axiosInstance from './axiosInstance';

export const hasAccess = async (user_id: string, course_id: string) => {
  try {
    const res = await axiosInstance.get(`/api/access/check/${user_id}/${course_id}`);
    return res.data; // Trả về dữ liệu từ server khi thành công
  } catch (error) {
    console.error('Error in checking access:', error);
    return { hasAccess: false, message: 'Failed to verify access' }; // Trả về mặc định khi có lỗi
  }
};

export const createAccess = async (data: string) => {
  const res = await axiosInstance.post('api/access/', data);
  return res.data;
};
