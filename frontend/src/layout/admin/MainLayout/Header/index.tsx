import { FC } from 'react';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

// project imports

import SearchSection from './SearchSection';
// import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import Logo from '@/ui-component/Logo';

interface HeaderProps {
  handleLeftDrawerToggle: () => void;
}

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header: FC<HeaderProps> = ({ handleLeftDrawerToggle }) => {
  const theme: any = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 258,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            flexGrow: 1,
          }}
        >
          <Logo/>
        </Box>
        <ButtonBase
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              transition: 'all .2s ease-in-out',
              background: 'none',
              color: theme.palette.text.primary,
              '&:hover': {
                background: theme.palette.background.paper2,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box
        sx={{
          flexGrow: 1,
        }}
      />
      <Box
        sx={{
          flexGrow: 1,
        }}
      />

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      <ProfileSection />
    </>
  );
};

export default Header;
