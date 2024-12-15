import { LearningPath } from '@/views/pages/admin/LearningPath/LearningPathList';
import axiosInstance from './axiosInstance';

export const fetchLearningPaths = async (params: {}) => {
  const res = await axiosInstance('api/learning-path', { params });
  return res.data.data;
};

export const newLearningPath = async (datas: {
  title: string;
  // thumbnail: string;
  description: string;
}) => {
  const res = await axiosInstance.post('api/learning-path', datas);
  return res;
};

export const updateLearningPath = async (_id: string, updateData: LearningPath) => {
  const res = await axiosInstance.patch(`api/learning-path/${_id}`, updateData);
  return res.data;
};

export const deleteLearningPath = async (_id: string) => {
  const res = await axiosInstance.delete(`api/learning-path/${_id}`);
  return res;
};
