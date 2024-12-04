import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, styled, Typography, useTheme } from '@mui/material';
import { More } from '@mui/icons-material';
import moment from 'moment';
import * as _ from 'lodash';

// my pj
import CourseListSkl from '@/ui-component/cards/Skeleton/CourseListSkl';
import HeaderTitle from '../Title';
import path from '@/constants/routes';
import { Course } from '@/interfaces/course';
import FilterComponent from '@/components/Filter';
import { getCourseList } from '@/api/courseApi';
const BoxBetween = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '25px',
}));

const CourseList: React.FC = () => {
  const theme = useTheme();

  const courses = useQuery({
    queryKey: ['courses'],
    queryFn: getCourseList,
  });

  console.log(courses.data);

  if (courses.isLoading) return <CourseListSkl />;
  return (
    <Box>
      <HeaderTitle
        des='Chức năng "Danh sách khóa học" giúp cho quản trị có cái
        nhìn tổng quan về các khóa học trong hệ thống, và có thể thao tác với những nguồn tài nguyên đó.'
        titleButton="Tạo khóa học"
        link={path.admin.newCourse}
      />
      <FilterComponent
        filters={[
          {
            displayName: 'Danh mục',
            name: 'categories',
            values: ['Khoa học', 'Kinh tế', 'Nghệ thuật'],
          },
          {
            displayName: 'Loại',
            name: 'types',
            values: ['Miễn phí', 'Tính phí'],
          },
        ]}
        onFilter={(filters) => {
          console.log('Kết quả lọc:', filters);
        }}
      />

      <Grid container spacing={2}>
        {courses.data.map((course: Course) => (
          <Grid key={course._id} item sm={12} md={6}>
            <Box sx={{ backgroundColor: theme.palette.background.paper }} p={2}>
              <BoxBetween>
                <Typography variant="h3">{course.title}</Typography>
                <More />
              </BoxBetween>

              <Grid container spacing={10}>
                <Grid item lg={6}>
                  <Grid container spacing={2}>
                    <Grid item>
                      {course.thumbnail && <img src={typeof course.thumbnail === 'string' ? course.thumbnail : ''} />}
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth component={Link} to={`/courses/${course._id}/update`} variant="outlined">
                        Xem và sửa khóa học
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={6}>
                  <BoxBetween>
                    <Typography>Tổng thời gian</Typography>
                    <Typography>
                      {(() => {
                        let totalDuration = 0;
                        for (let i = 0; i < course.modules.length; i++) {
                          for (let j = 0; j < course.modules[i].resources.length; j++) {
                            totalDuration += course.modules[i].resources[j].duration;
                          }
                        }
                        return moment.utc(totalDuration * 1000).format('HH:mm:ss');
                      })()}
                    </Typography>
                  </BoxBetween>
                  <BoxBetween>
                    <Box>Số lượng chương</Box>
                    <Box>{course.modules.length}</Box>
                  </BoxBetween>
                  <BoxBetween>
                    <Box>Số lượng tài liệu</Box>
                    <Box>
                      {(() => {
                        let totalResource = 0;
                        for (let i = 0; i < course.modules.length; i++) {
                          totalResource += course.modules[i].resources.length;
                        }
                        return totalResource;
                      })()}
                    </Box>
                  </BoxBetween>
                  <BoxBetween>
                    <Box>Loại khóa học</Box>
                    <Box>{course.isFree ? 'Miễn phí' : 'Tính phí'}</Box>
                  </BoxBetween>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default CourseList;
