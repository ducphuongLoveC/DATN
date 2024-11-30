import axiosInstance from './axiosInstance';

export const getMedia = async (type: string) => {
  try {
    const res = await axiosInstance.get(`api/media/${type}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
