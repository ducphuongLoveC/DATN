import axiosInstance from './axiosInstance';
export const verifyCaptcha = async (token: string | null) => {
  if (token) {
    try {
      const res = await axiosInstance.post('api/captcha/verify', {
        token: token,
      });
      return res.data.success;
    } catch (error) {
      console.error('Error verifying captcha:', error);
      return false;
    }
  } else {
    console.log('Captcha not completed or invalid.');
    return false;
  }
};

export const registerUser = async (data: { nickname: string; name: string; email: string; password: string }) => {
  const res = await axiosInstance.post('api/auth/register', data);
  return res;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('api/auth/login', data);
  return res;
};
