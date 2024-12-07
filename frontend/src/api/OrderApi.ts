import axiosInstance from './axiosInstance';

export const createOrder = async ({
  user_id,
  course_id,
  payment_method,
  amount,
}: {
  user_id: string;
  course_id: string;
  payment_method: string;
  amount: number;
}) => {
  const res = await axiosInstance.post(`api/order`, { user_id, course_id, payment_method, amount });
  return res.data;
};
export const getOrders = async () => {
  const res = await axiosInstance.get(`api/order`);
  return res.data;
};
