import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

interface User {
  id: number;
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  profile_picture: string;
}

const useUsersAdmin = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('api/user'); // Adjust the URL to your backend API
      if (response.data.success) {
        const admins = response.data.data.filter((user: User) => user.role === 'admin');
        setRows(admins); // Cập nhật danh sách người dùng có role là admin
      } else {
        setError('No data found');
      }
    } catch (err) {
      setError('Error fetching users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { rows, loading, error };
};

export default useUsersAdmin;
