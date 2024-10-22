import { useState } from 'react';
import {
  Box,
  Typography,
  styled,
  useMediaQuery,
  Button,
  Hidden,
} from '@mui/material';
import { useTheme } from '@mui/material';

import HeadlessTippy from '@tippyjs/react/headless';

//icon mui
import MessageIcon from '@mui/icons-material/Message';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PerfectScrollbar from 'react-perfect-scrollbar';

// my pj
import ArtPlayerComponent from '@/components/ArtplayComponent';
import BackgroundOverlay from '../../../components/BackgroundOverlay';
import LearningList from './LearningList';
import PlacementToggle from '@/components/PlacementToggle';
import Comment from './Comment';
import Wrapper from '@/components/Wrapper';
import TextEditor from '@/components/TextEditor';

const BoxHeaderAndNote = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
}));

const BoxLearningList = styled(Box)(({ theme }) => ({
  position: 'static',
  zIndex: 887,
  width: '450px',
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
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

const LessonNavigation = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: theme.palette.background.paper2,
  height: '50px',
  zIndex: 888,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: '4px 30px',
  borderRadius: '20px',
  background: theme.palette.background.paper,
  marginRight: '10px',
  [theme.breakpoints.down('sm')]: {
    padding: '2px 8px',
  },
}));

const Learning: React.FC = () => {
  const [isLearningPlayList, setIsLearningPlayList] = useState<boolean>(true);
  const [isVisibleNote, setIsVisibleNote] = useState<boolean>(false);

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const toggleLearningList = () => {
    setIsLearningPlayList((prev) => !prev);
  };

  const handleToggleNote = () => {
    setIsVisibleNote(!isVisibleNote);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {/* box content bên trái gồm video nội dung */}
        <PerfectScrollbar
          style={{
            width: '100%',
            height: '87vh',
            overflow: 'auto',
            background: theme.palette.background.paper,
          }}
        >
          <ArtPlayerComponent videoUrl="https://vip.opstream11.com/20220723/34981_6ae66f6b/index.m3u8" />
          <Box
            sx={{
              marginTop: '10px',
              padding: {
                sm: '0',
                md: '20px',
              },
              background: theme.palette.background.paper,
            }}
          >
            <BoxHeaderAndNote>
              <Box>
                <Typography variant="h1" fontWeight={500}>
                  Javascript là gì?
                </Typography>
                <Typography variant="caption">
                  Cập nhật tháng 11 năm 2022
                </Typography>
              </Box>
              <Box>
                <HeadlessTippy
                  zIndex={999}
                  visible={isVisibleNote}
                  placement="bottom-end"
                  allowHTML
                  interactive
                  render={(attrs) => (
                    <Wrapper {...attrs} style={{ width: '500px' }}>
                      <TextEditor
                        key={isVisibleNote ? 'visible' : 'hidden'} // Force reinitialization when visibility changes
                        initialHeight="150px"
                        initialValue=""
                        exportContent={(content) => {
                          console.log(content);
                        }}
                      />
                      <Button onClick={handleToggleNote}>Lưu ghi chú</Button>
                    </Wrapper>
                  )}
                >
                  <Button
                    onClick={handleToggleNote}
                    sx={{
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.background.paper2,
                      padding: '10px 30px',
                      borderRadius: '10px',
                    }}
                  >
                    Thêm ghi chú tại 0:00
                  </Button>
                </HeadlessTippy>
              </Box>
            </BoxHeaderAndNote>
            <Typography
              variant="body1"
              sx={{
                marginTop: '20px',
                borderRadius: '10px',
                padding: '20px',
              }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit...
            </Typography>
          </Box>
        </PerfectScrollbar>
        {isLearningPlayList && (
          <BoxLearningList>
            <LearningList onClose={toggleLearningList} />
          </BoxLearningList>
        )}
      </Box>
      <LessonNavigation>
        {/* sử dụng placement để mở 1 popup kéo từ bên placement vào */}
        <PlacementToggle
          placement="left"
          Connect={(connect) => (
            <Button
              onClick={connect}
              sx={{ color: theme.palette.text.primary, height: '50px' }}
            >
              <MessageIcon />
              <Hidden smDown>
                <Typography ml={1} variant="h4">
                  Hỏi đáp
                </Typography>
              </Hidden>
            </Button>
          )}
        >
          {/* Nội dung bên trong */}
          <Comment />
        </PlacementToggle>

        <Box display={'flex'} alignItems={'center'}>
          <Box>
            <ButtonStyle>
              <Typography mr={1} variant="h4">
                <ArrowBackIosNewIcon sx={{ fontSize: '25px' }} />
                BÀI TRƯỚC
              </Typography>
            </ButtonStyle>
          </Box>
          <Box>
            <ButtonStyle sx={{ background: 'var(--color-primary)' }}>
              <Typography mr={1} variant="h4" color="white">
                BÀI TIẾP THEO
                <ArrowForwardIosIcon />
              </Typography>
            </ButtonStyle>
          </Box>
        </Box>

        <Button
          sx={{ color: theme.palette.text.primary }}
          onClick={toggleLearningList}
        >
          <Hidden mdDown>
            <Typography mr={1} variant="h4">
              Biến và kiểu dữ liệu
            </Typography>
          </Hidden>
          {isLearningPlayList ? (
            <ArrowForwardIcon sx={{ fontSize: '25px' }} />
          ) : (
            <MenuOpenIcon sx={{ fontSize: '25px' }} />
          )}
        </Button>
      </LessonNavigation>
      <BackgroundOverlay
        onClick={toggleLearningList}
        open={downMD && isLearningPlayList}
      />
    </Box>
  );
};

export default Learning;
