import { useState, useEffect } from 'react';

import axiosInstance from '@/api/axiosInstance';

interface Course {
  _id: string;
  title: string;
  description: string;
  original_price: number;
  sale_price: number;
  enrollment_count: number;
  isActive: boolean;
  thumbnail: string;
  createdAt: string;
}

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('api/courses');
        const coursesData = response.data.data;
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else {
          console.error('Courses data is not an array:', coursesData);
          setError('Invalid data format received.');
          setCourses([]);
        }
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;
