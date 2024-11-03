import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// ui
import { Box, Grid, Typography, Button, CardMedia, styled, useTheme, Avatar } from '@mui/material';

//my pj
import AverageRating from '@/components/AverageRating';
import Module from '@/components/Module';
import ButtonPrimary from '@/components/ButtonPrimary';
// import {InputPrimary} from '@/components/InputPrimary';
import RatingPreview from '@/components/RatingPreview';

//icon
import DoneIcon from '@mui/icons-material/Done';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import SpeedIcon from '@mui/icons-material/Speed';
import DvrIcon from '@mui/icons-material/Dvr';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';

//my pj
import { getCourseFull } from '@/api/courseApi';

const BoxCenter = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'var(--medium-space)',
}));

const BoxPreviewVideo = styled(Box)(({}) => ({
  position: 'relative',
  cursor: 'pointer',
  '&::after': {
    content: '" "',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 'var(--main-border-radius)',
    zIndex: 1,
  },
}));

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isShowMoreLearningOutCome, setIsShowMoreLearningOutCome] = useState(false);
  const [expandedIndexs, setExpandedIndexs] = useState<number[]>([0]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course'],
    queryFn: () => getCourseFull(id || ''),
  });

  const theme = useTheme();
  const handleToggleExpanded = (index: number) => {
    setExpandedIndexs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const handleToggleExpandedAll = () => {
    if (data.modules.length == expandedIndexs.length) {
      setExpandedIndexs([]);
    } else {
      setExpandedIndexs(data.modules.map((_: unknown, index: number) => index));
    }
  };

  const handleToggleShowMoreLearningOutCome = () => {
    setIsShowMoreLearningOutCome((prev) => !prev);
  };

  const totalResources = useMemo(() => {
    if (data) {
      return data.modules.reduce((acc: number, c: any) => acc + c.resources.length, 0);
    }
  }, [data]);

  const totalhourse = useMemo(() => {
    if (data) {
      const totalSecond = data.modules.reduce((acc: number, c: any) => {
        return (
          acc +
          c.resources.reduce((acc: number, m: any) => {
            return acc + m.duration;
          }, 0)
        );
      }, 0);
      const duration = moment.duration(totalSecond, 'seconds');
      const hours = duration.hours();
      const minutes = duration.minutes();

      return `${hours} giờ ${minutes} phút`;
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Box mt={'var(--large-space)'}>
      <Grid
        container
        spacing={{ xs: 0, sm: 2, lg: 4 }}
        width={'100%'}
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            md: 'row',
          },
          px: {
            xs: '10px',
            md: '0',
          },
        }}
      >
        <Grid item xs={12} md={8} xl={8}>
          <Typography variant="h2">{data.title}</Typography>
          <Typography
            variant="body1"
            mt={'var(--medium-space)'}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <AverageRating totalRatings={25} totalUserRate={5} totalStars={5} />
          <Button
            sx={{
              padding: 0,
              my: 'var(--medium-space)',
            }}
          >
            <Avatar src="/images/avatar.jpg" />
            <Typography variant="h4" ml="var(--medium-space)">
              {data.user.name}
            </Typography>
            <CheckCircleIcon sx={{ fontSize: 'var(--small-icon)', ml: '3px' }} />
          </Button>
          <Typography variant="h3" mt={'var(--medium-space)'}>
            Bạn sẽ học được những gì?
          </Typography>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper2,
            }}
          >
            <Grid
              container
              sx={{
                overflow: 'hidden',
                maxHeight: isShowMoreLearningOutCome ? 'none' : '400px',
              }}
              spacing={1}
              mt={'var(--medium-space)'}
              p={2}
            >
              {data.learning_outcomes.map((l: string, index: number) => (
                <Grid item xs={6} key={index} display={'flex'}>
                  <DoneIcon fontSize="inherit" />
                  <Typography ml={1}>{l}</Typography>
                </Grid>
              ))}
            </Grid>

            <Button onClick={handleToggleShowMoreLearningOutCome}>
              {isShowMoreLearningOutCome ? 'Ẩn bớt' : 'Xem thêm'}
            </Button>
          </Box>
          <Typography variant="h3" mt={'var(--medium-space)'}>
            Nội dung khóa học
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="body1" mt={'var(--medium-space)'}>
              4 chương • 12 bài học • Thời lượng 03 giờ 26 phút
            </Typography>
            <Button onClick={handleToggleExpandedAll}>
              {expandedIndexs.length == data.modules.length ? 'Đóng tất cả' : 'Mở tất cả'}
            </Button>
          </Box>
          <Box
            mt={'var(--medium-space)'}
            sx={{
              border: '1px solid #d1d7dc',
            }}
          >
            {data.modules.map((module: { title: string; resources: any }, index: number) => (
              <Module
                onClick={() => handleToggleExpanded(index)}
                expanded={expandedIndexs.includes(index)}
                styleM="two"
                key={index}
                title={module.title}
                items={module.resources}
              />
            ))}
          </Box>
          <Typography variant="h3" mt={'var(--medium-space)'}>
            Đánh giá
          </Typography>
          <RatingPreview ratingCounts={[5, 5, 1, 6, 200]} />
        </Grid>
        {/* box 2 */}
        <Grid item xs={12} md={4} xl={4}>
          <Box
            position={'sticky'}
            top="97px"
            mb={'var(--medium-space)'}
            sx={{
              backgroundColor: theme.palette.background.paper2,
              paddingBottom: '20px',
            }}
          >
            {/* preview video */}
            <BoxPreviewVideo>
              <CardMedia
                component="img"
                image={data.thumbnail}
                sx={{
                  borderRadius: '14px',
                  width: '100%',
                }}
              />
              <PlayCircleIcon
                sx={{
                  position: 'absolute',
                  fontSize: 'var(--large-icon)',
                  color: 'white',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                Xem giới thiệu
              </Typography>
            </BoxPreviewVideo>

            <Grid
              container
              spacing={2}
              sx={{
                px: {
                  sm: 0,
                  md: 5,
                },
              }}
            >
              {/* giá */}
              <Grid item xs={12} mt={'var(--medium-space)'}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="h2">{Number(data.sale_price).toLocaleString('vi-VN')} VND</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ textDecoration: 'line-through' }}>
                      {Number(data.original_price).toLocaleString('vi-VN')} VND
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* mã giảm giá */}
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={8}>
                    <input placeholder="nhập mã" style={{ padding: '11px', width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <ButtonPrimary customVariant="outlined" fullWidth>
                      Áp
                    </ButtonPrimary>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <ButtonPrimary fullWidth>
                  Thanh toán ngay <PaymentIcon />{' '}
                </ButtonPrimary>
              </Grid>

              {/* nhận lại sau khóa học */}
              <Grid item xs={12}>
                <Typography variant="h4" fontWeight={'var(--bold-font-weight)'}>
                  Khóa học bao gồm:
                </Typography>

                <BoxCenter>
                  <SpeedIcon />
                  <Typography ml={2}>Trình độ học mức {data.level}</Typography>
                </BoxCenter>

                <BoxCenter>
                  <DvrIcon />
                  <Typography ml={2}>Tổng số bài giảng {totalResources}</Typography>
                </BoxCenter>

                <BoxCenter>
                  <AccessTimeIcon />
                  <Typography ml={2}>Tổng thời lượng {totalhourse}</Typography>
                </BoxCenter>

                <BoxCenter>
                  <EmojiEventsIcon />
                  <Typography ml={2}>Cấp chứng khi sau khi hoàn thành</Typography>
                </BoxCenter>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetail;
