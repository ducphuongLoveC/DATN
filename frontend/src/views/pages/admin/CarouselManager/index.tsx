import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Paper, TableRow, TableCell, IconButton, Tooltip, Collapse, TableContainer, Table, TableHead, TableBody, Backdrop, CircularProgress } from '@mui/material';
import axiosInstance from '@/api/axiosInstance';
import Dialog from '@/components/Dialog';
import HeaderTitle from '../Title';
import Carousel from '@/components/Carousel';
import TabsCustom from '@/components/TabsCustom';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { colors } from '@/api/color';

const CarouselManager: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isIndexOpens, setIsIndexOpens] = useState<number[]>([]);
  const [newCarousel, setNewCarousel] = useState({
    path: '',
    image: '' as string | File,
    background: '',
    title: '',
    description: '',
  });
  const [carousels, setCarousels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [carouselToDelete, setCarouselToDelete] = useState<string | null>(null);
  const [editCarouselId, setEditCarouselId] = useState<string | null>(null);  // For editing

  const handleToggler = (index: number) => {
    if (isIndexOpens.includes(index)) {
      setIsIndexOpens(isIndexOpens.filter((i: number) => i !== index));
    } else {
      setIsIndexOpens((pre) => [...pre, index]);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCloseDialog = () => {
    // Reset form khi đóng Dialog
    setNewCarousel({ path: '', image: '', background: '', title: '', description: '' });
    setSelectedColor('');
    setEditCarouselId(null); // Reset editCarouselId khi đóng Dialog
    setError(null); // Xóa lỗi
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCarousel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!newCarousel.path || !newCarousel.title || !newCarousel.description) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    if (!newCarousel.image && !editCarouselId) {
      setError('Vui lòng chọn hình ảnh.');
      return;
    }

    setIsLoading(true); // Bắt đầu loading

    try {
      const formData = new FormData();
      if (newCarousel.path) formData.append('path', newCarousel.path);

      // Nếu đang chỉnh sửa và không thay đổi ảnh, gửi URL hiện tại
      if (editCarouselId && typeof newCarousel.image === 'string') {
        formData.append('image', newCarousel.image); // URL ảnh hiện tại
      }
      // Nếu ảnh là file mới được chọn
      else if (newCarousel.image instanceof File) {
        formData.append('image', newCarousel.image);
      } else if (!editCarouselId) {
        setError('Hình ảnh không hợp lệ.');
        return;
      }

      if (selectedColor) formData.append('background', selectedColor);
      if (newCarousel.title) formData.append('title', newCarousel.title);
      if (newCarousel.description) formData.append('description', newCarousel.description);

      let response;
      if (editCarouselId) {
        response = await axiosInstance.put(`/api/carousel/${editCarouselId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axiosInstance.post('/api/carousel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (response.data.success) {
        // Update state for carousel list
        if (editCarouselId) {
          setCarousels((prevCarousels) =>
            prevCarousels.map((carousel) =>
              carousel._id === editCarouselId ? response.data.data : carousel
            )
          );
          alert('Carousel đã được sửa thành công!');
        } else {
          setCarousels((prevCarousels) => [...prevCarousels, response.data.data]);
          alert('Carousel đã được tạo thành công!');
        }

        // Reset form data and states
        setNewCarousel({ path: '', image: '', background: '', title: '', description: '' });
        setSelectedColor('');
        setEditCarouselId(null);
        setError(null);
        setOpenDialog(false);

      } else {
        // Kiểm tra thông điệp lỗi từ backend
        if (response.data.message === "Đã đạt giới hạn 10 carousel, không thể tạo thêm") {
          setError('Đã đạt giới hạn 10 carousel, không thể tạo thêm');
          alert('Không thể tạo thêm carousel, đã đạt giới hạn!');
        } else {
          setError('Không thể tạo/sửa carousel');
          alert('Không thể tạo/sửa carousel');
        }
      }
    } catch (error) {
      console.error('Error creating/updating carousel:', error);
      setError('Lỗi khi tạo/sửa carousel');
      alert('Đã có lỗi xảy ra khi tạo/sửa carousel hoặc vượt quá 10 carousel!');
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };

  const handleDelete = async () => {
    if (!carouselToDelete) return;

    try {
      const response = await axiosInstance.delete(`/api/carousel/${carouselToDelete}`);
      if (response.data.success) {
        setCarousels((prevCarousels) =>
          prevCarousels.filter((carousel) => carousel._id !== carouselToDelete)
        );
        alert('Carousel đã được xóa thành công!');
        setError(null);
      } else {
        setError('Không thể xóa carousel');
        alert('Không thể xóa carousel');
      }
    } catch (error) {
      setError('Lỗi khi xóa carousel');
      console.error(error);
      alert('Đã có lỗi xảy ra khi xóa carousel!');
    }
  };

  const fetchCarousels = async () => {
    try {
      const response = await axiosInstance.get('/api/carousel');
      if (response.data.success) {
        setCarousels(response.data.data);
      } else {
        setError('Không có carousel nào');
      }
    } catch (error) {
      setError('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (carousel: any) => {
    setNewCarousel({
      path: carousel.path,
      image: carousel.image,
      background: carousel.background,
      title: carousel.title,
      description: carousel.description,
    });
    setSelectedColor(carousel.background);
    setEditCarouselId(carousel._id);  // Set the carousel ID for editing
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  return (
    <>
      <HeaderTitle des="Quản lý banner" titleButton="Tạo carousel" onClick={() => setOpenDialog(true)} />
      <Box component={Paper} sx={{ padding: '20px' }}>
        <TabsCustom
          onChange={() => { }}
          labels={['Xem trước', 'Dữ liệu']}
          contents={[
            <Carousel dot sliders={carousels.length > 0 ? carousels : []} />,
            <TableContainer sx={{ borderRadius: '0' }}>
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
                  {loading ? (
                    <Typography>Đang tải dữ liệu...</Typography>
                  ) : (
                    carousels.map((carousel) => (
                      <>
                        <TableRow key={carousel._id}>
                          <TableCell>
                            <IconButton onClick={() => handleToggler(carousel._id)} size="small">
                              {isIndexOpens.includes(carousel._id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                          </TableCell>
                          <TableCell>{carousel.title}</TableCell>
                          <TableCell>{carousel.path}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Sửa">
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(carousel)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton
                                color="error"
                                onClick={() => {
                                  setCarouselToDelete(carousel._id);
                                  handleDelete();
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                            <Collapse in={isIndexOpens.includes(carousel._id)} timeout="auto" unmountOnExit>
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '250px',
                                  background: carousel.background,
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
                                      {carousel.title}
                                    </Typography>
                                    <Typography sx={{ lineHeight: '25px' }} variant="body1" component="p">
                                      {carousel.description}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Link to={carousel.path}>
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
                                  <img src={carousel.image} alt={carousel.title} style={{ height: '100%', objectFit: 'contain' }} />
                                </Box>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ]}
        />
      </Box>

      <Dialog open={openDialog} title={editCarouselId ? 'Sửa carousel' : 'Tạo carousel'} onClose={handleCloseDialog}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tên Carousel"
              name="title"
              fullWidth
              value={newCarousel.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Đường dẫn"
              name="path"
              fullWidth
              value={newCarousel.path}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô tả"
              name="description"
              fullWidth
              value={newCarousel.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Chọn màu nền</Typography>
            <Grid container spacing={1}>
              {colors.map((color, index) => (
                <Grid item key={index} xs={1}>
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      background: color,
                      cursor: 'pointer',
                      border: selectedColor === color ? '10px solid #fff' : '1px solid transparent',
                    }}
                    onClick={() => handleColorSelect(color)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {newCarousel.image && typeof newCarousel.image === 'string' && (
              <Box sx={{ marginBottom: 2 }}>
                <Typography>Hình ảnh hiện tại:</Typography>
                <Box
                  component="img"
                  src={newCarousel.image}
                  alt="Hình ảnh hiện tại"
                  sx={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }}
                />
              </Box>
            )}
            <Typography>Tải lên hình ảnh mới:</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewCarousel({ ...newCarousel, image: e.target.files![0] })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isLoading} onClick={handleSubmit} variant="contained" color="primary" fullWidth>
              {editCarouselId ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      {/* Hiển thị CircularProgress khi đang loading */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CarouselManager;