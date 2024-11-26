import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Tabs, Tab, Box, Grid } from '@mui/material';

// pj
import CourseItem from './CourseItem';
import { getCourseFullList } from '@/api/courseApi';
import { fetchLearningPaths } from '@/api/learningPathApi';
import { getCourseLearningPath } from '@/api/courseLearningPath';

// skeleton
import CourseSkeleton from '@/ui-component/cards/Skeleton/CourseSkeleton';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: any;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
      {value === index && <Box pt={2}>{children}</Box>}
    </Box>
  );
};
const Course: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    data: allCourses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourseFullList,
  });
  const { data: learningPaths, isLoading: isPathsLoading } = useQuery({
    queryKey: ['learning_paths'],
    queryFn: fetchLearningPaths,
  });

  const { data: coursesByPath, isLoading: isCoursesLoading } = useQuery({
    queryKey: ['courses_by_learning_path', value],
    queryFn: async () => {
      if (learningPaths && value > 0) {
        const selectedPath = learningPaths[value - 1];
        const response = await getCourseLearningPath(selectedPath._id);

        return response.courses || [];
      }
      return [];
    },
    enabled: value > 0 && !!learningPaths,
  });

  if (isLoading || isPathsLoading) return <CourseSkeleton />;
  if (isError) return <div>Error loading courses...</div>;

  return (
    <Box sx={{ width: '100%' }} mt={2}>
      <Tabs
        scrollButtons="auto"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ width: '100%' }}
      >
        <Tab label="Tất cả" />
        {learningPaths && learningPaths.map((path: any, index: number) => <Tab key={index} label={path.title} />)}
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {allCourses?.map((course: any, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <CourseItem
                to={`/learning/${course._id}`}
                title={course.title}
                postUser={course.user?.name || ''}
                price={course.original_price}
                salePrice={course.sale_price}
                thumbnail={course.thumbnail}
                totalRatings={50}
                totalUserRate={10}
                totalStars={5}
                isFree={course.isFree}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {learningPaths &&
        learningPaths.map((_: any, index: number) => (
          <TabPanel value={value} index={index + 1} key={index}>
            {isCoursesLoading ? (
              <CourseSkeleton />
            ) : (
              <Grid container spacing={3}>
                {coursesByPath?.map((course: any, courseIndex: number) => (
                  <Grid key={courseIndex} item xs={12} sm={6} md={4} lg={3}>
                    <CourseItem
                      to={`/learning/${course._id}`}
                      title={course.title}
                      postUser={course.user?.name || ''}
                      price={course.original_price}
                      salePrice={course.sale_price}
                      thumbnail={course.thumbnail}
                      totalRatings={50}
                      totalUserRate={10}
                      totalStars={5}
                      isFree={course.isFree}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
        ))}
    </Box>
  );
};

export default Course;
