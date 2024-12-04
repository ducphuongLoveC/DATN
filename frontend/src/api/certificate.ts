import axiosInstance from './axiosInstance';

export const getCertificateByCertificateId = async (certificate_id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/certificate/${certificate_id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCertificate = async (data: {}) => {
  try {
    const res = await axiosInstance.post('api/certificate/', data);
    return res;
  } catch (error) {
    throw error;
  }
};
