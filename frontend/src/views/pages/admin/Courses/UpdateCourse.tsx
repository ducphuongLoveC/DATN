import { useMutation, useQuery } from '@tanstack/react-query';
import CourseForm from './CourseForm';
import { Course } from '@/interfaces/course';
import HeaderTitle from '../Title';
import path from '@/constants/routes';
import { getCourse, updateCourse } from '@/api/courseApi';
import { useParams } from 'react-router-dom';

// toast
import { ToastContainer, toast } from 'react-toastify';
import Loading from '@/ui-component/Loading';
const UpdateCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourse(id || ''),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationKey: ['course', id],
    mutationFn: (course: Course) => updateCourse(id || '', course),
    onSuccess: async () => {
      toast.dismiss();
      toast.success('Cập nhật khóa học thành công.');
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
      toast.dismiss();
      toast.error(error.response.data.message);
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
      <ToastContainer />
      {mutation.isPending && <Loading />}
    </>
  );
};

export default UpdateCourse;
