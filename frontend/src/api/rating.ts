import axiosInstance from './axiosInstance';

export const fetchRatingByCourseId = async (course_id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/rating/${course_id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const createRating = async (data: { user_id: string; course_id: string; stars: number; comment: string }) => {
  try {
    const res = await axiosInstance.post('api/rating', data);
    return res;
  } catch (error) {
    throw error;
  }
};
