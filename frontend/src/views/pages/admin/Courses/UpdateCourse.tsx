import { useMutation, useQuery } from '@tanstack/react-query';
import CourseForm, { Course } from './CourseForm';
import HeaderTitle from '../Title';
import path from '@/constants/routes';
import { getCourse, updateCourse } from '@/api/courseApi';
import { useParams } from 'react-router-dom';

const UpdateCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Đảm bảo kiểu cho `id`
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourse(id || ''),
    enabled: !!id, // Chỉ thực hiện yêu cầu nếu có ID
  });

  const mutation = useMutation({
    mutationKey: ['course', id], // Thêm ID vào mutationKey để theo dõi
    mutationFn: (course: Course) => updateCourse(id || '', course),
    onSuccess: () => {
      // Xử lý thành công (ví dụ: thông báo cho người dùng)
      alert('Cập nhật khóa học thành công!');
    },
    onError: (error: any) => {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      console.error('Cập nhật khóa học thất bại:', error);
    },
  });

  const handleUpdateCourse = (course: Course) => {
    console.log(course);
    mutation.mutate(course); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching course data</div>;

  return (
    <>
      <HeaderTitle
        des='Chức năng "Sửa khóa học" cho phép quản trị viên sửa nhanh các thông tin của một khóa học, bao gồm modules, resources.'
        titleButton="Danh sách khóa học"
        link={path.admin.courses}
      />
      <CourseForm onSubmit={handleUpdateCourse} datas={data} />
    </>
  );
};

export default UpdateCourse;
