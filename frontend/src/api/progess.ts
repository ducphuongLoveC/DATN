import axiosInstance from './axiosInstance';

// Hàm để bắt đầu khóa học và tạo tiến độ cho resource đầu tiên
export const startResource = async (user_id: string, resource_id: string) => {
  try {
    const { data } = await axiosInstance.post('api/progress/start', {
      resource_id,
      user_id,
    });
    return data;
  } catch (error) {
    console.error('Error in startCourse:', error);
    throw error;
  }
};

// Hàm để hoàn thành resource và cập nhật tiến độ
export const completeResource = async (user_id: string, resource_id: string) => {
  try {
    const res = await axiosInstance.patch(`api/progress/${user_id}/${resource_id}/complete`);
    return res;
  } catch (error) {
    console.error('Error in completeResource:', error);
    throw error;
  }
};
