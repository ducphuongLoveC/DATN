import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Box, styled, useTheme, Button, Typography, useMediaQuery } from '@mui/material';
import { BiChevronLeft } from 'react-icons/bi';
import DescriptionIcon from '@mui/icons-material/Description';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_THEME_HOME } from '@/store/actions';

// pj
import { RootState } from '@/store/reducer';
import Progress from '@/components/Progress';
import Note from './Note';
import PlacementToggle from '@/components/PlacementToggle';

const BoxHeader = styled('header')<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  background: theme.palette.background.paper === '#ffffff' ? '#29303b' : theme.palette.background.paper,
  height: isMobile ? '40px' : '50px',
  alignItems: 'center',
  paddingRight: '20px',
}));

const StyledButton = styled(Button)({
  height: '50px',
});

const BoxCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '10px',
});

const StyledDescriptionBox = styled(BoxCenter)({
  cursor: 'pointer',
});

import { Module } from '@/interfaces/course';

interface HeaderProps {
  data: Module[];
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.homeReducer);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleTheme = () => {
    const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
    dispatch({
      type: TOGGLE_THEME_HOME,
      theme: newTheme,
    });
  };

  const totalResource = useMemo(() => {
    return data.reduce((acc, m) => acc + m.resources.length, 0);
  }, [data]);

  const totalResourceCompleted = useMemo(() => {
    return data.reduce((acc, m) => {
      return acc + m.resources.filter((r) => r?.progress?.is_completed).length;
    }, 0);
  }, [data]);

  return (
    <BoxHeader isMobile={isMobile}>
      <Box color="white" display="flex" alignItems="center">
        <Link to={'/'}>
          <StyledButton>
            <BiChevronLeft color="white" />
          </StyledButton>
        </Link>
        <Typography variant={isMobile ? 'h6' : 'h5'} color="white">
          HTML CSS từ Zero đến Hero
        </Typography>
      </Box>
      <BoxCenter>
        <BoxCenter>
          <Progress width={50} value={(100 / totalResource) * totalResourceCompleted} />
          {!isMobile && (
            <Typography variant="caption" color="white">
              {totalResourceCompleted}/{totalResource} bài học
            </Typography>
          )}
        </BoxCenter>

        <PlacementToggle
          placement="right"
          Connect={(connect) => (
            <StyledDescriptionBox onClick={connect}>
              <DescriptionIcon sx={{ color: 'white', fontSize: '20px', marginRight: '5px' }} />
              {!isMobile && (
                <Typography color="white" variant="body2">
                  Ghi chú
                </Typography>
              )}
            </StyledDescriptionBox>
          )}
        >
          <Note />
        </PlacementToggle>

        <BoxCenter sx={{ cursor: 'pointer' }} onClick={handleToggleTheme}>
          <ContrastIcon sx={{ fontSize: '20px', color: 'white', mr: 1 }} />
          {!isMobile && (
            <Typography color="white" variant="body2">
              Theme
            </Typography>
          )}
        </BoxCenter>
      </BoxCenter>
    </BoxHeader>
  );
};

export default Header;
