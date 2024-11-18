import axiosInstance from './axiosInstance';

export const getResource = async (course_id: string, id: string) => {
  const res = await axiosInstance.get(`api/resource/${course_id}/${id}`);
  return res.data;
};

export const getNameModuleById = async (id: string) => {
  const res = await axiosInstance.get(`api/resource/${id}/find-module-name`);
  return res.data;
};

export const getAdjacentResourceId = async (id: string, direction: string) => {
  const res = await axiosInstance.get(`api/resource/${id}/adjacent/id?direction=${direction}`);
  return res.data;
};
export const getFirstResourceId = async (course_id: string) => {
  try {
    const res = await axiosInstance.get(`api/resource//first-resource/${course_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
