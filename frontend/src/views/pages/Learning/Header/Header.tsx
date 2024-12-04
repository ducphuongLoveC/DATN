import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, styled, useTheme, Button, Typography, useMediaQuery } from '@mui/material';
import { BiChevronLeft } from 'react-icons/bi';
import DescriptionIcon from '@mui/icons-material/Description';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_THEME_HOME } from '@/store/actions';

import StarsIcon from '@mui/icons-material/Stars';
// pj
import Dialog from '@/components/Dialog';
import { RootState } from '@/store/reducer';
import Progress from '@/components/Progress';
import Note from './Note';
import PlacementToggle from '@/components/PlacementToggle';
import { getSingleCourseById } from '@/api/courseApi';
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
import RatingPreview from '@/components/RatingPreview';
import { NoteProp } from '@/interfaces/Note';
import { createRating, fetchRatingByCourseId } from '@/api/rating';

interface HeaderProps {
  notes: NoteProp[];
  data: Module[];
}

const Header: React.FC<HeaderProps> = ({ data, notes }) => {
  console.log(notes);

  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.homeReducer);
  const user = useSelector((state: RootState) => state.authReducer.user);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [openRate, setOpenRate] = useState(false);

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['singleCourseById'],
    queryFn: () => getSingleCourseById(id || ''),
  });

  const { data: rating, refetch: refetchRating } = useQuery({
    queryKey: ['rating', id],
    queryFn: () => fetchRatingByCourseId(id || ''),
  });

  const mutationRating = useMutation({
    mutationKey: ['rating'],
    mutationFn: createRating,
    onSuccess: () => {
      refetchRating();
    },
  });

  const handleToggleTheme = () => {
    const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
    dispatch({
      type: TOGGLE_THEME_HOME,
      theme: newTheme,
    });
  };

  const handleCreateRating = (stars: number, comment: string) => {
    if (user?._id && id && stars && comment) {
      const payload = {
        course_id: id,
        user_id: user._id,
        stars: stars,
        comment: comment,
      };
      mutationRating.mutate(payload);
    }
  };

  const isRated = useMemo(() => {
    return rating?.ratings.some((r: any) => r.user_id === user._id);
  }, [data, rating]);

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
          {isLoadingCourse ? 'loading...' : course.title}
        </Typography>
      </Box>
      <BoxCenter>
        <BoxCenter>
          <Progress sx={{ width: '100px' }} value={(100 / totalResource) * totalResourceCompleted} />
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
          <Note notes={notes} />
        </PlacementToggle>

        <BoxCenter sx={{ cursor: 'pointer' }} onClick={handleToggleTheme}>
          <ContrastIcon sx={{ fontSize: '20px', color: 'white', mr: 1 }} />
          {!isMobile && (
            <Typography color="white" variant="body2">
              Theme
            </Typography>
          )}
        </BoxCenter>

        <BoxCenter sx={{ cursor: 'pointer' }} onClick={() => setOpenRate(true)}>
          <StarsIcon sx={{ fontSize: '20px', color: 'white', mr: 1 }} />
          {!isMobile && (
            <Typography color="white" variant="body2">
              Đánh giá
            </Typography>
          )}
        </BoxCenter>
      </BoxCenter>

      <Dialog open={openRate} title="Đánh giá" onClose={() => setOpenRate(false)}>
        <RatingPreview
          user_id={user._id}
          comments={rating ? rating.ratings : []}
          onChange={handleCreateRating}
          mode={isRated ? 'view' : 'edit'}
          ratingCounts={
            rating
              ? [
                  rating.stats.oneStar,
                  rating.stats.twoStars,
                  rating.stats.threeStars,
                  rating.stats.fourStars,
                  rating.stats.fiveStars,
                ]
              : [0, 0, 0, 0, 0]
          }
        />
      </Dialog>
    </BoxHeader>
  );
};

export default Header;
