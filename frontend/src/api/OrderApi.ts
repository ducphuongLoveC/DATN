import axiosInstance from './axiosInstance';

export const createOrder = async ({
  user_id,
  course_id,
  payment_method,
  amount,
  code,
}: {
  user_id: string;
  course_id: string;
  payment_method: string;
  amount: number;
  code: string;
}) => {
  console.log(code);
  
  const res = await axiosInstance.post(`api/order`, { user_id, course_id, payment_method, amount, code });
  return res.data;
};
