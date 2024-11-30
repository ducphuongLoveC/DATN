import { styled, Box } from '@mui/material';
import LearningList from './LearningList';
const BoxLearningList = styled(Box)(({ theme }) => ({
  position: 'static',
  zIndex: 887,
  width: '450px',
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    zIndex: 1000,
  },
  [theme.breakpoints.down('sm')]: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100% !important',
    height: '100%',
  },
}));

const TrackList: React.FC<any> = ({ modules, open, onClose }) => {
  return open ? (
    <BoxLearningList>
      <LearningList modules={modules} onClose={onClose} />
    </BoxLearningList>
  ) : null;
};

export default TrackList;
