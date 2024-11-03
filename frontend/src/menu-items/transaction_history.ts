// assets
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import path from '@/constants/routes';
const icons = {
  CurrencyExchangeIcon,
};

const transaction_history = {
  id: 'transaction_history',
  title: '',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'transhistory',
      title: 'Lịch sử giao dịch',
      type: 'collapse',
      icon: icons.CurrencyExchangeIcon,

      children: [
        {
          id: 'history',
          title: 'Danh sách giao dịch',
          type: 'item',
          url: path.admin.transactionHistory,
          target: false,
        },
      ],
    },
  ],
};

export default transaction_history;
