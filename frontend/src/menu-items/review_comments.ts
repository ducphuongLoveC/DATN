// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import path from '@/constants/routes';
const icons = {
  PermIdentityIcon,
};

const review_comments = {
  id: 'review_comments',
  title: 'review_comments',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'review_comments',
      title: 'Bình luận và đánh giá',
      type: 'collapse',
      icon: icons.PermIdentityIcon,
      children: [
        {
          id: 'review',
          title: 'Đánh giá',
          type: 'item',
          url: path.admin.reviewList,
          target: false,
        },
        {
          id: 'comments',
          title: 'Bình luận',
          type: 'item',
          url: path.admin.commentList,
          target: false,
        },
      ],
    },
  ],
};


export default review_comments;
