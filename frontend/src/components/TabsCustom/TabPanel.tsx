import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {/* Luôn render nội dung */}
      <Box p={2} hidden={value !== index}>
        {children}
      </Box>
    </div>
  );
};
export default TabPanel;
