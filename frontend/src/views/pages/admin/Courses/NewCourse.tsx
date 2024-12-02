import CourseForm from './CourseForm';
import { useMutation } from '@tanstack/react-query';
import { newCourse } from '@/api/courseApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// my pj
import { Course } from '@/interfaces/course';
import path from '@/constants/routes';
import HeaderTitle from '../Title';
import sleep from '@/utils/sleep';
import Loading from '@/ui-component/Loading';

const NewCourse: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['courses'],
    mutationFn: newCourse,

    onSuccess: async () => {
      toast.dismiss();
      toast.success('Tạo khóa học thành công');
      await sleep(2000);
      navigate(path.admin.courses);
    },
    onError: (error: any) => {
      console.log(error.response.data.message);

      toast.dismiss();
      toast.error(error.response.data.message);
    },
  });

  const handleNewCourse = async (course: Course) => {
    console.log(course);
    mutation.mutate(course);
  };

  return (
    <>
      <HeaderTitle
        des='Chức năng "Tạo khóa học" cho phép quản trị 
        viên tạo nhanh các thông tin của một khóa học, bao gồm modules, resources.'
        titleButton="Danh sách khóa học"
        link={path.admin.courses}
      />
      <CourseForm onSubmit={handleNewCourse} />
      {mutation.isPending && <Loading />}
      <ToastContainer />
    </>
  );
};

export default NewCourse;
