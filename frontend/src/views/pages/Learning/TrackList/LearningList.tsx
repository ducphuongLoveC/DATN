import React, { memo } from 'react';
import { Typography, Box, useTheme, IconButton } from '@mui/material';

// redux
import { useSelector, useDispatch } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Module from '@/components/Module';
import CloseIcon from '@mui/icons-material/Close';
import { Resource } from '@/interfaces/course';
import { RootState } from '@/store/reducer';
import { SET_EXPANDED_INDEXS } from '@/store/actions';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

interface LearningListProps {
  modules: { title: string; resources: Resource }[];
  onClose: () => void;
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

  const handleToggleExpandedAll = () => {
    dispatch({
      type: SET_EXPANDED_INDEXS,
      payload:
        storedExpandedIndexs.length > 0
          ? []
          : Array(modules.length)
              .fill(0)
              .map((_, index: number) => index),
    });
  };
  const theme = useTheme();
 
  return (
    <PerfectScrollbar
      style={{
        borderLeft: `3px solid ${theme.palette.background.paper2}`,
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
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1, justifyContent: 'space-between' }}>
          <Box display={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleToggleExpandedAll}>
              {storedExpandedIndexs.length > 0 ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
            <Typography fontSize="15px" variant="body1" fontWeight="500">
              Nội dung khóa học của bạn
            </Typography>
          </Box>
          <Box onClick={onClose} mr={1}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
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
