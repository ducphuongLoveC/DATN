import dashboard from './dashboard';
import courses from './courses';
import transaction_history from './transaction_history';
import user from './user';
import review_comments from './review_comments';
import coupon from './coupon';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, courses, coupon, transaction_history, user, review_comments],
};

export default menuItems;
