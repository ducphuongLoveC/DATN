import axiosInstance from './axiosInstance';

export const getNotificationById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/notification/${id}`);
    return data;
  } catch (error) {
    console.log();
  }
};
export const markAsRead = async (id: string) => {
  try {
    const res = axiosInstance.patch(`api/notification/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const markAllAsRead = async (user_id: string) => {
  try {
    const res = axiosInstance.patch(`api/notification/mark-all-as-read/${user_id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotificationsByUserId = async (user_id: string) => {
  try {
    const res = axiosInstance.delete(`api/notification/delete-all/${user_id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
