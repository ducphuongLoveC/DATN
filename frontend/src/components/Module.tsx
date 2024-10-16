import {
  Accordion,
  AccordionSummary,
  Box,
  Typography,
  AccordionDetails,
  Checkbox,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';

interface ModuleProps {
  styleM?: 'one' | 'two';
  title: string;
  items: any[];
}

const Module: React.FC<ModuleProps> = ({ styleM = 'one', title, items }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // Hàm để render tiêu đề
  const renderTitle = () => (
    <Typography fontSize={'16px'}>
      {styleM === 'two' &&
        (expanded ? (
          <AddIcon sx={{ fontSize: '17px' }} />
        ) : (
          <RemoveIcon sx={{ fontSize: '17px' }} />
        ))}{' '}
      {title}
      {styleM === 'two' && (
        <Box
          position={'absolute'}
          right={10}
          top={'50%'}
          sx={{ transform: 'translateY(-50%)' }}
        >
          (3 bài học)
        </Box>
      )}
    </Typography>
  );

  // Hàm để render thời gian tổng hợp cho styleM 'one'
  const renderSummary = () => (
    <Typography variant="caption">
      0/{items.length} |{' '}
      {moment
        .utc(items.reduce((acc, c) => acc + c.time, 0) * 1000)
        .format('HH:mm:ss')}
    </Typography>
  );

  // Hàm để render từng item trong AccordionDetails
  const renderItems = () =>
    items.map((item, idx) => (
      <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          sx={{
            padding: 0,
            '& .MuiSvgIcon-root': {
              fontSize: '1rem',
            },
            marginRight: '10px',
          }}
        />
        <Box>
          <Typography>{item.title}</Typography>
          <Typography variant="caption">
            {moment.utc(item.time * 1000).format('mm:ss')}
          </Typography>
        </Box>
      </Box>
    ));

  return (
    <Accordion
      disableGutters
      onClick={toggleExpanded}
      sx={{
        mb: styleM === 'two' ? '10px' : '0',
        backgroundColor:
          styleM == 'two'
            ? theme.palette.background.paper2
            : theme.palette.background.paper,
      }}
    >
      <AccordionSummary
        expandIcon={
          styleM === 'one' ? (
            <ExpandMore sx={{ color: theme.palette.text.primary }} />
          ) : null
        }
      >
        <Box>
          {renderTitle()} {styleM === 'one' && renderSummary()}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        onClick={(event) => event.stopPropagation()}
        sx={{ backgroundColor: theme.palette.background.paper2 }}
      >
        {renderItems()}
      </AccordionDetails>
    </Accordion>
  );
};

export default Module;
