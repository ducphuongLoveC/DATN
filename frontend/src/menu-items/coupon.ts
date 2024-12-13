// assets
import DiscountIcon from '@mui/icons-material/Discount';
import path from '@/constants/routes';
const icons = {
  DiscountIcon,
};

const coupon = {
  id: 'coupon',
  title: 'Mã giảm giá',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'coupon ',
      title: 'Quản lý mã giảm giá',
      type: 'item',
      url: path.admin.coupon,
      icon: icons.DiscountIcon,
      breadcrumbs: true,
    },
  ],
};

export default coupon;
