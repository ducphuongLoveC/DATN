import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, styled, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

// pj
import CourseItem from './CourseItem';
interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: any;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box pt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const Course: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CourseItem
              title="Javascript cho người mới bắt đầu"
              postUser="admin"
              price={4500000}
              salePrice={200000}
              thumbnail="https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain"
              totalRatings={22}
              totalUserRate={5}
              totalStars={5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CourseItem
              title="Javascript cho người mới bắt đầu"
              postUser="admin"
              price={4500000}
              salePrice={200000}
              thumbnail="https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain"
              totalRatings={22}
              totalUserRate={5}
              totalStars={5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CourseItem
              title="Javascript cho người mới bắt đầu"
              postUser="admin"
              price={4500000}
              salePrice={200000}
              thumbnail="https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain"
              totalRatings={22}
              totalUserRate={5}
              totalStars={5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CourseItem
              title="Javascript cho người mới bắt đầu"
              postUser="admin"
              price={4500000}
              salePrice={200000}
              thumbnail="https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain"
              totalRatings={22}
              totalUserRate={5}
              totalStars={5}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CourseItem
              title="Javascript cho người mới bắt đầu"
              postUser="admin"
              price={4500000}
              salePrice={200000}
              thumbnail="https://th.bing.com/th/id/OIP.x15WU1tjr_qt2cEJaOgPSwHaD3?rs=1&pid=ImgDetMain"
              totalRatings={22}
              totalUserRate={5}
              totalStars={5}
            />
          </Grid>
          {/* Các CourseItem khác */}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Nội dung cho Tab 2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Nội dung cho Tab 3
      </TabPanel>
    </Box>
  );
};
export default Course;
