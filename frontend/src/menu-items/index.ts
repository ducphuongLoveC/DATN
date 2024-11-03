import dashboard from './dashboard';
import courses from './courses';
import posts from './posts';;
import transaction_history from './transaction_history';
import user from './user';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, courses,transaction_history, user , posts],
};

export default menuItems;
