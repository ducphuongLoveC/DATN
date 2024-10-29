// assets
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import path from '@/constants/routes';
const icons = {
  CurrencyExchangeIcon,
};

const transaction_history = {
  id: 'transaction_history',
  title: 'transaction_history',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'trans history',
      title: 'Trans history',
      type: 'collapse',
      icon: icons.CurrencyExchangeIcon,

      children: [
        {
          id: 'history',
          title: 'History list',
          type: 'item',
          url: path.admin.transactionHistory,
          target: false,
        },
      ],
    },
  ],
};

export default transaction_history;
