import React, { memo, useEffect } from 'react';
import { Typography, Box, useTheme } from '@mui/material';

// redux
import { useSelector, useDispatch } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Module from '@/components/Module';
import CloseIcon from '@mui/icons-material/Close';

import { Resource } from '../admin/Courses/CourseForm';
import { RootState } from '@/store/reducer';
import { SET_EXPANDED_INDEXS } from '@/store/actions';

interface LearningListProps {
  modules: { title: string; resources: Resource }[];
  onClose: () => void;
  idCourse?: string;
}
const LearningList: React.FC<LearningListProps> = memo(({ onClose, modules }) => {
  const dispatch = useDispatch();

  const storedExpandedIndexs = useSelector((state: RootState) => state.homeReducer.expandedIndexs);

  const handleToggleExpanded = (index: number) => {
    dispatch({
      type: SET_EXPANDED_INDEXS,
      payload: storedExpandedIndexs.includes(index)
        ? storedExpandedIndexs.filter((i: number) => i !== index)
        : [...storedExpandedIndexs, index],
    });
  };
  const theme = useTheme();
  useEffect(() => {
    return () => {
      dispatch({ type: SET_EXPANDED_INDEXS, payload: [0] });
    };
  }, []);
  return (
    <PerfectScrollbar
      style={{
        borderLeft: `1px solid ${theme.palette.background.paper2}`,
        overflow: 'auto',
        height: '87vh',
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
            expanded={storedExpandedIndexs.includes(index)}
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
