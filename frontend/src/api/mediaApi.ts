import axiosInstance from './axiosInstance';

export const getMedia = async (type: string, params: {}) => {
  try {
    const res = await axiosInstance.get(`api/media/${type}`, { params });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
