import { useState } from 'react';
import { Tabs, Tab, Box, useTheme } from '@mui/material';
import TabPanel from './TabPanel';

export interface TabsCustomProps {
  labels: string[] | React.ReactNode[];
  contents: React.ReactNode[];
  onChange: ()=> void;
}

const TabsCustom: React.FC<TabsCustomProps> = ({ labels, contents, onChange }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange();
  };

  return (
    <Box
      sx={{
        boxShadow: 'var(--main-box-shadow)',
      }}
    >
      {/* Tabs header */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="customized tabs example"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.text.primary,
          },
          boxShadow: "var(--main-box-shadow)"
        }}
      >
        {labels.map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{
              color: value === index ? '' : 'gray',
              '&.Mui-selected': {
                color: theme.palette.text.primary,
              },
              '&:hover': {
                color: 'darkgray',
              },
            }}
          />
        ))}
      </Tabs>

      {/* Tabs content */}
      <Box>
        {contents.map((content, index) => (
          <TabPanel key={index} value={value} index={index}>
            {content} {/* Luôn render nội dung */}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default TabsCustom;
