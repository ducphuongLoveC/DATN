// assets
import EditNoteIcon from '@mui/icons-material/EditNote';
import path from '@/constants/routes';
const icons = {
  EditNoteIcon,
};

const courses = {
  id: 'courses',
  title: 'Khóa học',
  caption: 'Crud khóa học',
  type: 'group',
  children: [
    {
      id: 'CourseManager',
      title: 'Khóa học',
      type: 'collapse',
      icon: icons.EditNoteIcon,

      children: [
        {
          id: 'LearningPathList',
          title: 'Dach mục khóa học',
          type: 'item',
          url: path.admin.LearningPathList,
          target: false,
        },
        {
          id: 'courseList',
          title: 'Danh sách khóa học',
          type: 'item',
          url: path.admin.courses,
          target: false,
        },
        {
          id: 'createCourses',
          title: 'Tạo khóa học',
          type: 'item',
          url: path.admin.newCourse,
          target: false,
        },
      ],
    },
  ],
};

export default courses;
