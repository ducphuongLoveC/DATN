import { Box } from '@mui/material';
import HeaderTitle from '../Title';

const Coupon: React.FC = () => {
  const handleOpenCreateCoupon = () => {
    console.log('open create coupon');
  };
  return (
    <Box>
      <HeaderTitle
        des="Cho phép quản trị tạo ra các mã giảm giá cho khóa học"
        titleButton="Tạo mã"
        onClick={handleOpenCreateCoupon}
      />
    </Box>
  );
};
export default Coupon;
