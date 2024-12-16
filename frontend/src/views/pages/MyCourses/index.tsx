import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// ui
import { useTheme } from '@mui/material';
import { Box, Grid, CardMedia, styled, Typography, TablePagination } from '@mui/material';

// api
import { getCoursesProgressWithUser } from '@/api/userApi';

// my pj
import { RootState } from '@/store/reducer';
import WrapperCard from '../Home/WrapperCard';
import Progress from '@/components/Progress';
import { Link } from 'react-router-dom';

const CustomCardMedia = styled(CardMedia)({
  height: '160px',
  overflow: 'hidden',
  objectFit: 'cover',
});

const MyCourses: React.FC = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  console.log(user);

  const theme = useTheme();
  const { data: coursesWithProgress, isLoading } = useQuery({
    queryKey: ['coursesWithProgress'],
    queryFn: () => getCoursesProgressWithUser(user._id),
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8); // Default to 8 courses per page

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  if (isLoading) return <div>Loading...</div>;

  // Slice the courses data based on current page and rows per page
  const offset = page * rowsPerPage;
  const currentCourses = coursesWithProgress?.courses.slice(offset, offset + rowsPerPage);

  return (
    <Box mt={3}>
      <Typography variant="h2">Khóa học của tôi</Typography>
      <Typography my={2} variant="body1">
        Các khóa học bạn đăng ký sẽ được hiện thị ở đây
      </Typography>

      <Grid container spacing={2}>
        {currentCourses?.map((c: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={c._id}>
            <Link to={`/learning/${c._id}`}>
              <WrapperCard>
                <CustomCardMedia image={c.thumbnail} />
                <Box
                  sx={{
                    padding: 1,
                    backgroundColor: theme.palette.background.paper2,
                    height: '140px',
                  }}
                >
                  <Typography variant="h4" mb={1}>
                    {c.title}
                  </Typography>

                  <Typography variant="h5" mt={1}>
                    Hoàn thành chương: {`${c.completedModules} / ${c.totalModules}`}{' '}
                    {c.completedModules === c.totalModules ? (
                      <Typography color={'green'} component={'span'}>
                        Hoàn thành
                      </Typography>
                    ) : null}
                  </Typography>
                  <Typography variant="h5" mt={1}>
                    Hoàn thành bài học: {` ${c.completedResources} / ${c.totalResources}`}{' '}
                    {c.completedResources === c.totalResources ? (
                      <Typography color={'green'} component={'span'}>
                        Hoàn thành
                      </Typography>
                    ) : null}
                  </Typography>
                  <Progress sx={{ mt: 3 }} textProgress={false} value={c.progress} />
                </Box>
              </WrapperCard>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* TablePagination for pagination */}
      <Box mt={3} display="flex" justifyContent="center">
        <TablePagination
          rowsPerPageOptions={[8, 16, 24]}
          component="div"
          count={coursesWithProgress?.courses.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số khóa học mỗi trang"
        />
      </Box>
    </Box>
  );
};

export default MyCourses;
