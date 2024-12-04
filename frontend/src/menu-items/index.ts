import dashboard from './dashboard';
import courses from './courses';
import posts from './posts';;
import transaction_history from './transaction_history';
import user from './user';
import review_comments from './review_comments';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, courses,transaction_history, user , review_comments, posts],
};

export default menuItems;
