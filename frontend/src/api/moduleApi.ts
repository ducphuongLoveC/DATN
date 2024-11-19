import axiosInstance from './axiosInstance';

// export const findModuleByCourseId = async (id: string) => {
//   const res = await axiosInstance.get(`api/module/${id}/module-resources`);
//   return res.data;
// };

export const findModuleByCourseId = async (id: string, user_id: string) => {
  const res = await axiosInstance.get(`api/module/${id}/${user_id}/module-resources`);
  return res.data;
};
