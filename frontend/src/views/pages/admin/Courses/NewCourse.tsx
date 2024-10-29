import CourseForm, { Course } from './CourseForm';
import { useMutation } from '@tanstack/react-query';
import { newCourse } from '@/api/courseApi';
import { Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// my pj
import sleep from '@/utils/sleep';
import path from '@/constants/routes';
import HeaderTitle from '../Title';

const NewCourse: React.FC = () => {
  const navigate = useNavigate();
  const mutationCourse = useMutation({
    mutationKey: ['courses'],
    mutationFn: newCourse,
    onSuccess: async () => {
      toast.success('Tạo khóa học thành công');
      await sleep(2000);
      navigate(path.admin.courses);
    },
    onError: () => {
      toast.error('Tạo khóa học thất bại!');
    },
  });
  const handleNewCourse = async (course: Course) => {
    console.log(course);
    mutationCourse.mutate(course);
  };

  return (
    <>
      <HeaderTitle
        des='Chức năng "Tạo khóa học" cho phép quản trị viên tạo nhanh các thông tin của một khóa học, bao gồm modules, resources.'
        titleButton="Danh sách khóa học"
        link={path.admin.courses}
      />
      <CourseForm onSubmit={handleNewCourse} />
      {mutationCourse.isPending && <Typography>Đang tạo khóa học</Typography>}
      <ToastContainer />
    </>
  );
};
export default NewCourse;
