// assets
import { IconCategory } from '@tabler/icons-react';

// constant
const icons = { IconCategory };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
import path from '@/constants/routes';
const categorys = {
  id: 'categorys',
  title: 'Categorys',
  type: 'group',
  children:  [
    {
      id: 'category',
      title: 'Category',
      type: 'collapse',
      icon: icons.IconCategory,

      children: [
        {
          id: 'category',
          title: 'Category ',
          type: 'item',
          url: path.admin.categorys,
          target: false,
        },
        {
          id: 'categoryArticle',
          title: 'Category article',
          type: 'item',
          url: path.admin.Articlecategorys,
          target: false,
        },
        {
          id: 'categoryCourse',
          title: 'course Category',
          type: 'item',
          url: path.admin.Coursecategorys,
          target: false,
        },
      ],
    },
  ],
};

export default categorys;
