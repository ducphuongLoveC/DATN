import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import HeaderTitle from '../Title';
import Carousel from '@/components/Carousel';
import { Link } from 'react-router-dom';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from 'react';
import TabsCustom from '@/components/TabsCustom';

const fakeSlider = [
  {
    _id: '1',
    path: '/reactjs',
    image: '/images/react.png',
    background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
    title: 'Khóa học React JS',
    description:
      'Khóa học React JS từ cơ bản đến nâng cao, giúp bạn xây dựng các ứng dụng web với khả năng tái sử dụng, quản lý trạng thái và xử lý dữ liệu hiệu quả.',
  },
  {
    _id: '2',
    path: '/nodejs',
    image: '/images/nodejs.png',
    background: 'linear-gradient(to right, #FDC830, #F37335)',
    title: 'NodeJS',
    description:
      'Học NodeJS, nắm vững kiến trúc non-blocking, xây dựng API RESTful và quản lý dữ liệu lớn với tốc độ cao, tích hợp với cơ sở dữ liệu như MongoDB, MySQL.',
  },
  {
    _id: '3',
    path: '/vuejs',
    image: '/images/vuejs.png',
    background: 'linear-gradient(to right, #7F00FF, #E100FF)',
    title: 'VueJS',
    description:
      'Tìm hiểu VueJS để xây dựng các ứng dụng web SPA nhanh, mượt mà, và quản lý trạng thái hiệu quả với Vue Router và Vuex.',
  },
  {
    _id: '4',
    path: '/angular',
    image: '/images/angular.png',
    background: 'linear-gradient(to right, #FF512F, #DD2476)',
    title: 'Angular',
    description:
      'Trở thành chuyên gia Angular, sử dụng TypeScript để phát triển ứng dụng với hiệu suất cao, tối ưu hóa và dễ bảo trì.',
  },
  {
    _id: '5',
    path: '/javascript',
    image: '/images/javascript-banner.png',
    background: 'linear-gradient(to right, #FFE000, #799F0C)',
    title: 'JavaScript',
    description:
      'Nắm vững JavaScript từ cơ bản đến nâng cao, bao gồm lập trình bất đồng bộ và tối ưu hóa hiệu suất trên cả front-end và back-end.',
  },
  {
    _id: '6',
    path: '/python',
    image: '/images/python-banner.png',
    background: 'linear-gradient(to right, #00B4DB, #0083B0)',
    title: 'Python',
    description:
      'Học Python cho phát triển web, khoa học dữ liệu và tự động hóa, xây dựng ứng dụng với Django hoặc Flask, phân tích dữ liệu hiệu quả.',
  },
  {
    _id: '7',
    path: '/ruby',
    image: '/images/ruby-banner.png',
    background: 'linear-gradient(to right, #FF416C, #FF4B2B)',
    title: 'Ruby',
    description:
      'Khám phá Ruby và Rails để phát triển ứng dụng web mạnh mẽ, tối ưu hóa và dễ bảo trì với hiệu suất cao.',
  },
  {
    _id: '8',
    path: '/php',
    image: '/images/php-banner.png',
    background: 'linear-gradient(to right, #1D976C, #93F9B9)',
    title: 'PHP',
    description:
      'Học PHP để xây dựng ứng dụng web server-side mạnh mẽ, kết nối cơ sở dữ liệu, xử lý yêu cầu HTTP và bảo mật cao.',
  },
  {
    _id: '9',
    path: '/golang',
    image: '/images/golang-banner.png',
    background: 'linear-gradient(to right, #36D1DC, #5B86E5)',
    title: 'Golang',
    description: 'Thành thạo Go để xây dựng hệ thống đa luồng, xử lý nhiều kết nối và tối ưu hóa mã cho hiệu suất cao.',
  },
  {
    _id: '10',
    path: '/java',
    image: '/images/java-banner.png',
    background: 'linear-gradient(to right, #FFB75E, #ED8F03)',
    title: 'Java',
    description:
      'Trở thành chuyên gia Java, phát triển ứng dụng doanh nghiệp, hệ thống lớn và phần mềm di động với Java Spring.',
  },
];

const CarouselManager: React.FC = () => {
  const [isIndexOpens, setIsIndexOpens] = useState<number[]>([]);

  const handleToggler = (index: number) => {
    if (isIndexOpens.includes(index)) {
      setIsIndexOpens(isIndexOpens.filter((i: number) => i !== index));
    } else {
      setIsIndexOpens((pre) => [...pre, index]);
    }
  };
  return (
    <>
      <HeaderTitle des="Quản lý banner" />
      <Box component={Paper}>
        <TabsCustom
          onChange={() => {}}
          labels={['Xem trước', 'Dữ liệu']}
          contents={[
            <Carousel dot sliders={fakeSlider} />,

            <TableContainer sx={{ borderRadius: 0 }}>
              <Table aria-label="learning paths table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Tên</TableCell>
                    <TableCell>Đường dẫn</TableCell>
                    <TableCell align="right">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fakeSlider.length > 0 ? (
                    fakeSlider.map((s: any, index: number) => (
                      <>
                        <TableRow key={s._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => handleToggler(index)}>
                              {isIndexOpens.includes(index) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {s.title}
                          </TableCell>

                          <TableCell>{s.path}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Sửa">
                              <IconButton color="primary">
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton color="error">
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                            <Collapse in={isIndexOpens.includes(index)} timeout="auto" unmountOnExit>
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '250px',
                                  background: s.background,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  padding: '20px 10px 0 50px',
                                  borderRadius: '10px',
                                }}
                              >
                                <Box
                                  sx={{
                                    flex: 1,
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      sx={{ color: 'white', marginBottom: '10px' }}
                                      variant="h1"
                                      component="h1"
                                    >
                                      {s.title}
                                    </Typography>
                                    <Typography sx={{ lineHeight: '25px' }} variant="body1" component="p">
                                      {s.description}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Link to={s.path}>
                                      <Button
                                        sx={{
                                          backgroundColor: 'transparent',
                                          color: 'white',
                                          border: `2px solid white`,
                                          marginBottom: '35px',
                                          padding: '3px 20px',
                                          borderRadius: 'var(--main-border-radius)',
                                          fontWeight: '600',
                                          transition: 'background-color 0.3s, color 0.3s',
                                          '&:hover': {
                                            backgroundColor: 'white',
                                            color: 'black',
                                          },
                                        }}
                                      >
                                        Học ngay nào
                                      </Button>
                                    </Link>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: { xs: 'none', sm: 'flex' },
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    padding: '10px',
                                  }}
                                >
                                  <img src={s.image} alt={s.title} style={{ height: '100%', objectFit: 'contain' }} />
                                </Box>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ))
                  ) : (
                    <Typography>Không có dữ liệu</Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>,
          ]}
        />
      </Box>
    </>
  );
};
export default CarouselManager;
