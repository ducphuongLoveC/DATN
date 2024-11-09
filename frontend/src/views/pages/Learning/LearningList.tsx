import React, { memo } from 'react';
import { useState } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Module from '@/components/Module';
import CloseIcon from '@mui/icons-material/Close';
import { Resource } from '../admin/Courses/CourseForm';

interface LearningListProps {
  modules: { title: string; resources: Resource }[];
  onClose: () => void;
  idCourse?: string;
}
const LearningList: React.FC<LearningListProps> = memo(({ onClose, modules }) => {
  const [expandedIndexs, setExpandedIndexs] = useState<number[]>([0]);

  const handleToggleExpanded = (index: number) => {
    setExpandedIndexs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const theme = useTheme();
  return (
    <PerfectScrollbar
      style={{
        overflow: 'auto',
        height: '87vh',
        //   sm: '93vh',
        //   md: '87vh',
        // },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.background.paper2}`,
        }}
      >
        <Typography fontSize="15px" p={2} variant="body1" fontWeight="500">
          Nội dung khóa học của bạn
        </Typography>
        <Box
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </Box>
      </Box>
      <Box>
        {modules.map((module, index) => (
          <Module
            isRedirect
            onClick={() => handleToggleExpanded(index)}
            expanded={expandedIndexs.includes(index)}
            key={index}
            title={module.title}
            items={module.resources}
          />
        ))}
      </Box>
    </PerfectScrollbar>
  );
});

export default LearningList;
