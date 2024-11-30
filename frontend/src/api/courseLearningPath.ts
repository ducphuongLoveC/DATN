import axiosInstance from './axiosInstance';

export const getCourseLearningPath = async (id: string) => {
  try {
    const res = await axiosInstance.get(`api/course-learning-path/${id}`);
  
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
