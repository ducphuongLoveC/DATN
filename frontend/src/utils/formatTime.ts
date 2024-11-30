import { padStart } from 'lodash';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${padStart(minutes.toString(), 2, '0')}:${padStart(secs.toString(), 2, '0')}`;
};
export default formatTime;
