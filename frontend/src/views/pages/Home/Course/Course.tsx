import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid } from '@mui/material';

const courses = [
  {
    title: 'Javascript cho người mới bắt đầu',
    postUser: 'admin',
    price: 4500000,
    salePrice: 200000,
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    totalRatings: 22,
    totalUserRate: 5,
    totalStars: 5,
  },
  {
    title: 'ReactJS từ cơ bản đến nâng cao',
    postUser: 'admin',
    price: 6000000,
    salePrice: 1000000,
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    totalRatings: 18,
    totalUserRate: 5,
    totalStars: 5,
  },
  {
    title: 'NodeJS cho Backend',
    postUser: 'teacher_01',
    price: 7000000,
    salePrice: 1500000,
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    totalRatings: 30,
    totalUserRate: 6,
    totalStars: 5,
  },
  {
    title: 'CSS Mastery: Từ cơ bản đến chuyên sâu',
    postUser: 'admin',
    price: 3000000,
    salePrice: 500000,
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    totalRatings: 15,
    totalUserRate: 7,
    totalStars: 5,
  },
  {
    title: 'Python cho người mới',
    postUser: 'teacher_02',
    price: 5000000,
    salePrice: 1000000,
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    totalRatings: 13,
    totalUserRate: 3,
    totalStars: 5,
  },
  {
    title: 'TypeScript nâng cao',
    postUser: 'admin',
    price: 5500000,
    salePrice: 900000,
    thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/maxresdefault.jpg',
    totalRatings: 10,
    totalUserRate: 5,
    totalStars: 5,
  },
];

// pj
import CourseItem from './CourseItem';
interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: any;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box pt={2}>{children}</Box>}
    </Box>
  );
};
const Course: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }} mt={2}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Lượt xem nhiều nhất" />
        <Tab label="Mới nhất" />
        <Tab label="Thịnh hành" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {courses.map((c, _id: number) => (
            <Grid key={_id} item xs={12} sm={6} md={4} lg={3}>
              <CourseItem
                to="/courses/"
                title={c.title}
                postUser={c.postUser}
                price={c.price}
                salePrice={c.salePrice}
                thumbnail={c.thumbnail}
                totalRatings={c.totalRatings}
                totalUserRate={c.totalUserRate}
                totalStars={c.totalStars}
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
