import { Accordion, AccordionSummary, Box, Typography, AccordionDetails, Checkbox } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material';
import { memo } from 'react';
import moment from 'moment';

import useQueryParams from '@/hooks/useQueryParams';

interface ModuleProps {
  isRedirect?: boolean;
  styleM?: 'one' | 'two';
  title: string;
  items: any;
  expanded?: boolean;
  onClick: (e: any) => void;
}

const Module: React.FC<ModuleProps> = ({
  isRedirect = false,
  styleM = 'one',
  title,
  items,
  expanded = false,
  onClick,
}) => {
  const theme = useTheme();

  const query = useQueryParams();

  const renderTitle = () => (
    <Box>
      <Box fontSize={'16px'}>
        {styleM === 'two' &&
          (expanded ? <RemoveIcon sx={{ fontSize: '17px' }} /> : <AddIcon sx={{ fontSize: '17px' }} />)}{' '}
        {title}
        {styleM === 'two' && (
          <Box fontSize={'15px'} position={'absolute'} right={10} top={'50%'} sx={{ transform: 'translateY(-50%)' }}>
            {items.length} bài học
          </Box>
        )}
      </Box>
    </Box>
  );

  const renderSummary = () => (
    <Typography variant="caption">
      0/{items.length} | {moment.utc(items.reduce((acc: any, c: any) => acc + c.duration, 0) * 1000).format('HH:mm:ss')}
    </Typography>
  );

  const renderItems = () =>
    items.map((item: any, idx: number) => (
      <Box
        sx={{ cursor: isRedirect ? 'pointer' : '' }}
        {...(isRedirect ? { onClick: () => query.set('id', item._id) } : {})}
        key={idx}
        style={{ display: 'flex', alignItems: 'center' }}
      >
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
          <Typography variant="caption">{moment.utc(item.duration * 1000).format('mm:ss')}</Typography>
        </Box>
      </Box>
    ));

  return (
    <Accordion
      onClick={(e) => onClick(e)}
      expanded={expanded}
      disableGutters
      sx={{
        mb: styleM === 'two' ? '10px' : '0',
      }}
    >
      <AccordionSummary
        sx={{
          backgroundColor: styleM === 'two' ? theme.palette.background.paper2 : theme.palette.background.paper,
        }}
        expandIcon={styleM === 'one' ? <ExpandMore sx={{ color: theme.palette.text.primary }} /> : null}
      >
        <Box>
          {renderTitle()} {styleM === 'one' && renderSummary()}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        onClick={(event) => event.stopPropagation()}
        sx={{
          backgroundColor: styleM === 'two' ? theme.palette.background.paper : theme.palette.background.paper2,
        }}
      >
        {renderItems()}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(Module);
