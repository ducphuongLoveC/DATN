import axiosInstance from './axiosInstance';

export const getNotificationById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/notification/${id}`);
    
    return data;
  } catch (error) {
    console.log();
  }
};
