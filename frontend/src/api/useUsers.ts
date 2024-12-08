// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

export interface User {
  id: number;
  _id: string;
  name: string;
  email: string;
  refering: string;
  profile_picture: string;
  phone: string;
  address: string;
  role: string;
}

const useUsers = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('api/user'); // Adjust the URL to your backend API
      if (response.data.success) {
        const members = response.data.data.filter((user: User) => user.role === 'member');
        setRows(members); // Cập nhật danh sách người dùng có role là member
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

export default useUsers;
