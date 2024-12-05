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
      type: 'item',
      icon: icons.CurrencyExchangeIcon,
      url: path.admin.transactionHistory,
      breadcrumbs: true,
    },
  ],
};

export default transaction_history;
