import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// Project imports
import MenuList from './MenuList';
import Chip from '@/ui-component/extended/Chip';
import { drawerWidth } from '@/store/constant';
import Logo from '@/ui-component/Logo';

// Define the props interface
interface SidebarProps {
  drawerOpen: boolean;
  drawerToggle: () => void;
  window?: Window | null;
}

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar: React.FC<SidebarProps> = ({
  drawerOpen,
  drawerToggle,
  window,
}) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <Box
      sx={{
        background: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: 2,
            mx: 'auto',
          }}
        >
         <Logo/>
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <MenuList />

            {/* <Stack
              direction="row"
              justifyContent="center"
              sx={{
                mb: 2,
              }}
            >
              <Chip
                label={import.meta.env.VITE_APP_VERSION}
                disabled
                chipcolor="secondary"
                size="small"
                sx={{
                  cursor: 'pointer',
                }}
              />
            
            </Stack> */}
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box
          sx={{
            px: 2,
          }}
        >
          <MenuList />

          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              mb: 2,
            }}
          >
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{
                cursor: 'pointer',
              }}
            />
          </Stack>
        </Box>
      </MobileView>
    </Box>
  );

  const container = window ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: {
          md: 0,
        },
        width: matchUpMd ? drawerWidth : 'auto',
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
