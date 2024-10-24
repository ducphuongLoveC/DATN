import dashboard from './dashboard';
import courses from './courses';
import posts from './posts';
import other from './other';
import utilities from './utilities';
import transaction_history from './transaction_history';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, courses, transaction_history, posts, other, utilities],
};

export default menuItems;
