import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
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
import { useState } from 'react';
import { fetchLearningPaths } from '@/api/learningPathApi';

const BoxBetween = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '25px',
}));

const CourseList: React.FC = () => {
  const theme = useTheme();

  const [params, setParams] = useState('');

  const queries = useQueries({
    queries: [
      {
        queryKey: ['courses', params],
        queryFn: () => getCourseList(params),
      },
      {
        queryKey: ['learning_paths'],
        queryFn: fetchLearningPaths,
      },
    ],
  });

  const courses = queries[0];
  const learningPaths = queries[1];

  const filterLearningPathList = useMemo(() => {
    return learningPaths?.data?.map((l: any) => ({ display: l.title, value: l._id }));
  }, [learningPaths]);

  if (courses.isLoading) return <CourseListSkl />;

  const handleSetParams = (params: any) => {
    const { search, ...rest } = params;

    const transform = Object.entries(rest).map(([key, values]: [string, any]) => ({
      [key]: values.map(({ value }: { value: string }) => value).join(','),
    }));

    const newParams = transform.map((item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      return `${key}=${value}`;
    });

    let queryString = '';
    if (search) {
      queryString = `?search=${search}`;
    }

    if (newParams.length > 0) {
      queryString += (search ? '&' : '?') + newParams.join('&');
    }
    setParams(queryString);
  };


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
            name: 'learning_paths',
            values: filterLearningPathList,
          },
          {
            displayName: 'Loại khóa học',
            name: 'types',
            values: [
              { display: 'Tính phí', value: false },
              { display: 'Miễn phí', value: true },
            ],
          },
        ]}
        onFilter={handleSetParams}
      />

      <Grid container spacing={2}>
        {courses?.data?.length ? (
          courses.data.map((course: Course) => (
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
          ))
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }} justifyContent={'center'}>
            <Typography>Không tìm thấy khóa học</Typography>
          </Grid>
        )}
      </Grid>
     
    </Box>
  );
};
export default CourseList;
