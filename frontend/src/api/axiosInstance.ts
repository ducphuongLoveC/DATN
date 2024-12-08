import axios from 'axios';
import Cookies from 'js-cookie';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 240000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => { 
    const token = Cookies.get('accessToken');
    // console.log("Token:", token);  // Kiểm tra token có đúng không

    // Kiểm tra nếu token có dấu ngoặc kép thì loại bỏ chúng
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.replace(/['"]+/g, '')}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
