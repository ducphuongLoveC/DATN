// assets
import { IconKey } from '@tabler/icons-react';

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
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true,
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true,
                },
            ],
        },
    ],
};

export default courses;
