import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

import Fab from '@mui/material/Fab';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AnimateButton from '@/ui-component/extended/AnimateButton';

// assets
import { IconSettings } from '@tabler/icons-react';
import DrawerSetting from '../DrawerSetting';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization: React.FC = () => {
  const theme = useTheme();
  // drawer on/off
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '0',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <DrawerSetting onClose={() => setOpen(false)} open={open} />
    </>
  );
};

export default Customization;
