import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Tabs, Tab, Box, Grid } from '@mui/material';

// pj
import CourseItem from './CourseItem';
import { getCourseFullList } from '@/api/courseApi';

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


  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourseFullList,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Box sx={{ width: '100%' }} mt={2}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Lượt xem nhiều nhất" />
        <Tab label="Mới nhất" />
        <Tab label="Thịnh hành" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {data.map((c: any, _id: number) => (
            <Grid key={_id} item xs={12} sm={6} md={4} lg={3}>
              <CourseItem
                to={`/learning/${c._id}`}
                title={c.title}
                postUser={c.user.name}
                price={c.original_price}
                salePrice={c.sale_price}
                thumbnail={c.thumbnail}
                totalRatings={50}
                totalUserRate={10}
                totalStars={5}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>Nội dung cho Tab 2</Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Nội dung cho Tab 3
      </TabPanel>
    </Box>
  );
};
export default Course;
