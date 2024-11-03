import axiosInstance from './axiosInstance';

export const getResource = async (id: string, direction : string) => {
  const res = await axiosInstance.get(`api/resource/${id}?direction=${direction}`);
  return res.data;
};

export const getAdjacentResourceId = async (id: string, direction : string) => {
    const res = await axiosInstance.get(`api/resource/${id}/adjacent-id?direction=${direction}`);
    return res.data;
  };
  