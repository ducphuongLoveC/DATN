// assets
import { IconKey } from '@tabler/icons-react';
import path from '@/constants/routes';
const icons = {
  IconKey,
};

const courses = {
  id: 'courses',
  title: 'courses',
  caption: 'Courses Caption',
  type: 'group',
  children: [
    {
      id: 'CourseManager',
      title: 'Courses manager',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'courseList',
          title: 'Courses list',
          type: 'item',
          url: path.admin.courses,
          target: false,
        },
        {
          id: 'createCourses',
          title: 'New courses',
          type: 'item',
          url: path.admin.newCourse,
          target: false,
        },
      ],
    },
  ],
};

export default courses;
