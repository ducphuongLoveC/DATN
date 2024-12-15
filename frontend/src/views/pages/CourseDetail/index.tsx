import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
// redux

// ui
import { Box, Grid, Typography, Button, CardMedia, styled, useTheme, Avatar, TextField } from '@mui/material';
//icon
import DoneIcon from '@mui/icons-material/Done';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import DvrIcon from '@mui/icons-material/Dvr';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
// toast
import { toast, ToastContainer } from 'react-toastify';

//my pj
import AverageRating from '@/components/AverageRating';
import Module from '@/components/Module';
import ButtonPrimary from '@/components/ButtonPrimary';
import RatingPreview from '@/components/RatingPreview';

//my pj
import Dialog from '@/components/Dialog';
import { getCourseFull } from '@/api/courseApi';
import { createOrder } from '@/api/OrderApi';
import { createAccess } from '@/api/accessApi';
import { RootState } from '@/store/reducer';
import sleep from '@/utils/sleep';
import path from '@/constants/routes';
import CourseDetailSkeleton from '../../../ui-component/cards/Skeleton/CourseDetailSkeleton';
import { fetchRatingByCourseId } from '@/api/rating';
import { applyCoupon, getCouponsByCourseId } from '@/api/coupon';
import CouponList from './CouponList';

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
  const [isOpenCoupon, setIsOpenCoupon] = useState(false);
  const [code, setCode] = useState('');
  const [discountData, setDiscountData] = useState<any>({});

  const { id } = useParams<{ id: string }>();
  const authState = useSelector((state: RootState) => state.authReducer);

  const [isShowMoreLearningOutCome, setIsShowMoreLearningOutCome] = useState(false);
  const [expandedIndexs, setExpandedIndexs] = useState<number[]>([0]);
  const navigate = useNavigate();
  const theme = useTheme();

  const mutation = useMutation({
    mutationKey: ['order'],
    mutationFn: createOrder,
    onMutate: () => {
      toast.loading('Vui lòng chờ...');
    },
    onSuccess: (data) => {
      window.location.href = data.payUrl;
      toast.dismiss();
    },
    onError: () => {
      toast.dismiss();
      toast.error('Thanh toán thất bại. Vui lòng thử lại!');
    },
  });

  const mutationAccess = useMutation({
    mutationKey: ['access'],
    mutationFn: createAccess,
    onMutate: () => {
      toast.loading('Đang tạo quyền truy cập!');
    },
    onSuccess: (data) => {
      if (data) {
        navigate(`/learning/${id}`);
      }
      toast.dismiss();
    },
    onError: () => {
      toast.dismiss();
      toast.error('Tạo quyền truy cập khóa học thất bại. Vui lòng thử lại!');
    },
  });

  const mutationCoupon = useMutation({
    mutationKey: ['coupon'],
    mutationFn: applyCoupon,
    onSuccess: (data) => {
      toast.success('Áp dụng khuyến mãi thành công');
      setDiscountData(data);
      refetchCoupons();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const { data: rating } = useQuery({
    queryKey: ['rating', id],
    queryFn: () => fetchRatingByCourseId(id || ''),
  });
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['course'],
    queryFn: () => getCourseFull(id || ''),
  });

  const {
    data: coupons,
    isLoading: isLoadingCoupon,
    refetch: refetchCoupons,
  } = useQuery({
    queryKey: ['coupons', data?._id],
    queryFn: () => getCouponsByCourseId(data?._id),
    enabled: data?.isFree === false,
  });

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

  const handleOrder = async () => {
    if (!authState.user || !authState.accessToken) {
      toast.error('Vui lòng đăng nhập trước khi thanh toán!');
      await sleep(2000);
      navigate(path.client.auth.login);
      return;
    }

    mutation.mutate({
      user_id: authState.user?._id,
      course_id: data?._id,
      amount: Math.round(discountData?.discountedPrice) || data?.sale_price,
      payment_method: 'MOMO',
      code: code,
      email: authState.user.email,
    });
  };

  const handleCreateAccess = async () => {
    if (!authState.user || !authState.accessToken || !data?._id) {
      navigate(path.client.auth.login);
      return;
    }

    mutationAccess.mutate({
      user_id: authState.user?._id,
      course_id: data?._id,
    });
  };

  const handleApplyCoupon = () => {
    if (!code) return toast.error('Vui lòng nhập code');
    if (!authState?.user?._id) return toast.error('Vui lòng đăng nhập');
    if (!data?.sale_price) return;
    if (!id) return;

    const payload: { code: string; course_id: string; price: string; user_id: string } = {
      code,
      course_id: id,
      price: data?.sale_price,
      user_id: authState?.user?._id,
    };
    mutationCoupon.mutate(payload);
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
      const second = duration.seconds();

      return `${hours} giờ ${minutes} phút ${second} giây`;
    }
  }, [data]);

  if (isLoading || isFetching) return <CourseDetailSkeleton />;

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
            xs: '2px',
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

          <AverageRating
            totalStars={rating?.stats.totalStars || 0}
            totalUserRate={rating?.stats.totalRatings || 0}
            stars={5}
          />
          <Button
            component={Link}
            to={`/profile?id=${data.user._id}`}
            sx={{
              padding: 0,
              my: 'var(--medium-space)',
            }}
          >
            <Avatar src={data.user.profile_picture} />
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
              {data.modules.length} chương • {totalResources} bài học • Thời lượng {totalhourse}
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
          <RatingPreview
            comments={rating ? rating.ratings : []}
            mode={'view'}
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
              minHeight: '80vh',
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
              {/* <Typography
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
              </Typography> */}
            </BoxPreviewVideo>

            <Grid
              container
              spacing={1}
              sx={{
                px: {
                  sm: 0,
                  md: 5,
                },
              }}
            >
              {!data.isFree && (
                <>
                  {/* giá */}
                  <Grid item xs={12} mt={'var(--medium-space)'}>
                    <Grid container spacing={2} alignItems="center">
                      {Object.keys(discountData)?.length > 0 && (
                        <Grid item>
                          <Typography variant="h3">
                            {Number(Math.round(discountData?.discountedPrice)).toLocaleString('vi-VN')} VND
                          </Typography>
                        </Grid>
                      )}

                      <Grid item>
                        <Typography
                          sx={{ textDecoration: Object.keys(discountData)?.length > 0 ? 'line-through' : '' }}
                          variant={Object.keys(discountData)?.length > 0 ? 'h5' : 'h3'}
                        >
                          {Number(data.sale_price).toLocaleString('vi-VN')} VND
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" sx={{ textDecoration: 'line-through' }}>
                          {Number(data.original_price).toLocaleString('vi-VN')} VND
                        </Typography>
                      </Grid>
                      {Object.keys(discountData)?.length > 0 && (
                        <Grid xs={12} item>
                          Bạn dùng mã {discountData.code} được giảm{' '}
                          {Number(Math.round(discountData?.discount)).toLocaleString('vi-VN')} đ
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {/* mã giảm giá */}
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={6}>
                        <TextField
                          onChange={(e) => setCode(e.target.value)}
                          value={code}
                          placeholder="nhập mã"
                          variant="outlined"
                          fullWidth
                          inputProps={{ style: { padding: '14px' } }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ButtonPrimary onClick={handleApplyCoupon} customVariant="outlined" fullWidth>
                          Áp dụng
                        </ButtonPrimary>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
              {!data.isFree && (
                <Grid item>
                  <Button onClick={() => setIsOpenCoupon(true)} sx={{ p: 0, m: 0 }} size="small">
                    Khuyến mãi
                  </Button>
                </Grid>
              )}

              <Grid item xs={12}>
                {data.isFree ? (
                  <ButtonPrimary
                    disabled={mutationAccess.isPending}
                    onClick={handleCreateAccess}
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Đăng ký học ngay
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary disabled={mutation.isPending} onClick={handleOrder} fullWidth>
                    Thanh toán ngay <PaymentIcon />
                  </ButtonPrimary>
                )}
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
                {data.has_certificate && (
                  <BoxCenter>
                    <EmojiEventsIcon />
                    <Typography ml={2}>Cấp chứng khi sau khi hoàn thành</Typography>
                  </BoxCenter>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
      <Dialog title="Mã khuyến mãi" open={isOpenCoupon} onClose={() => setIsOpenCoupon(false)}>
        {isLoadingCoupon ? (
          'loading...'
        ) : coupons?.length > 0 ? (
          <CouponList
            coupons={coupons}
            onChange={(code) => {
              setCode(code);
              setIsOpenCoupon(false);
            }}
          />
        ) : (
          <Typography>Không có mã giảm giá nào cho khóa học này</Typography>
        )}
      </Dialog>
    </Box>
  );
};

export default CourseDetail;
