import moment from 'moment';

const formatLastUpdated = (dateString: string) => {
  const formattedDate = moment(dateString).format('MMMM YYYY');
  return `Cập nhật ${formattedDate}`;
};

export default formatLastUpdated;
