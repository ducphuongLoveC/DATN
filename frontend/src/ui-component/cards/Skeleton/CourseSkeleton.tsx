import { useState } from 'react';
import { Tabs, Tab, Box, Grid, Skeleton } from '@mui/material';

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

const CourseSkeleton: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} mt={2}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Lượt xem nhiều nhất" />
        <Tab label="Mới nhất" />
        <Tab label="Thịnh hành" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default CourseSkeleton;
