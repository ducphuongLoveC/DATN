import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSelector } from 'react-redux';

import { Box, Typography, styled, useMediaQuery, Button, Hidden } from '@mui/material';
import { useTheme } from '@mui/material';

//icon mui
import MessageIcon from '@mui/icons-material/Message';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PerfectScrollbar from 'react-perfect-scrollbar';

// my pj
import BackgroundOverlay from '../../../components/BackgroundOverlay';
import PlacementToggle from '@/components/PlacementToggle';
import { findModuleByCourseId } from '@/api/moduleApi';
import useQueryParams from '@/hooks/useQueryParams';
import { getAdjacentResourceId, getResource } from '@/api/Resource';
import { ModulesSkeleton, ResourceSkeleton } from '@/ui-component/cards/Skeleton/LearningSkeleton';

// thành phần con
import Comment from './Comment';
import Resource from './Resource';
import TrackList from './TrackList';
import { RootState } from '@/store/reducer';
import Header from './Header/Header';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  padding: '4px 30px',
  borderRadius: '20px',
  background: theme.palette.background.paper,
  marginRight: '10px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 8px',
  },
}));

const Learning: React.FC = () => {
  const { id } = useParams();
  const query = useQueryParams();

  const user = useSelector((state: RootState) => state.authReducer.user);

  const idResource = query.get('id') || '';
  const [openTrackList, setOpenTrackList] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const moduleQuery = useQuery({
    queryKey: ['module'],
    queryFn: () => findModuleByCourseId(id || '', user._id),
  });

  const resourceQuery = useQuery({
    queryKey: ['resource', idResource],
    queryFn: () => getResource(id || '', user._id, idResource ? idResource : ''),
  });

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const toggleLearningList = () => {
    setOpenTrackList((prev) => !prev);
  };

  const handleAdjacentResourceId = async (direction: string) => {
    try {
      const res = await getAdjacentResourceId(idResource, direction, user._id);

      console.log(res);
      if (res?.progress?.is_unlocked) {
        query.set('id', res._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['resource'] });
    };
  }, [queryClient]);

  if (moduleQuery.isError || resourceQuery.isError) return <div>Error</div>;

  if (!resourceQuery.isLoading && !idResource) {
    query.set('id', resourceQuery.data._id);
  }

  return (
    <Box position={'relative'}>
      {!moduleQuery.isLoading && (
        <Header resource_id={resourceQuery.data._id} user_id={user._id} data={moduleQuery.data} />
      )}
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <PerfectScrollbar
          style={{
            width: '100%',
            height: '87vh',
            overflow: 'auto',
            background: theme.palette.background.paper,
          }}
        >
          {resourceQuery.isLoading ? (
            <ResourceSkeleton />
          ) : (
            <Resource resource={resourceQuery.data} refetchResource={moduleQuery.refetch} />
          )}
        </PerfectScrollbar>

        {moduleQuery.isLoading ? (
          <ModulesSkeleton />
        ) : (
          <TrackList modules={moduleQuery.data} open={openTrackList} onClose={toggleLearningList} />
        )}
      </Box>
      <LessonNavigation>
        {/* sử dụng placement để mở 1 popup kéo từ bên placement vào */}
        <PlacementToggle
          defaultOpen={query.get('comment') ? true : false}
          placement="left"
          Connect={(connect) => (
            <Button onClick={connect} sx={{ color: theme.palette.text.primary, height: '50px' }}>
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
            <ButtonStyle
              sx={{
                px: {
                  xs: '50px',
                },
              }}
              onClick={() => handleAdjacentResourceId('previous')}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: '20px' }} />

              <Typography
                mr={1}
                variant="h4"
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline',
                  },
                }}
              >
                BÀI TRƯỚC
              </Typography>
            </ButtonStyle>
          </Box>
          <Box>
            <ButtonStyle
              sx={{
                background: 'var(--color-primary)',
                px: {
                  xs: '50px',
                },
              }}
              onClick={() => handleAdjacentResourceId('next')}
            >
              <Typography
                mr={1}
                variant="h4"
                color="white"
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline',
                  },
                }}
              >
                BÀI TIẾP THEO
              </Typography>
              <ArrowForwardIosIcon sx={{ fontSize: '20px', color: 'white' }} />
            </ButtonStyle>
          </Box>
        </Box>

        <Button sx={{ color: theme.palette.text.primary, height: '50px' }} onClick={toggleLearningList}>
          <Hidden mdDown>
            <Typography mr={1} variant="h4">
              {!resourceQuery.isLoading && resourceQuery.data.module.title}
            </Typography>
          </Hidden>
          {openTrackList ? <ArrowForwardIcon sx={{ fontSize: '25px' }} /> : <MenuOpenIcon sx={{ fontSize: '25px' }} />}
        </Button>
      </LessonNavigation>
      <BackgroundOverlay onClick={toggleLearningList} open={downMD && openTrackList} />
    </Box>
  );
};

export default Learning;
