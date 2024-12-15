import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
// import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// cookies

import Cookies from 'js-cookie';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';
import { SET_USER } from '@/store/actions';
import DrawerSetting from '@/layout/admin/DrawerSetting';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const theme = useTheme();
  const navigate = useNavigate();

  const [value, setValue] = useState<string>('');
  // const [notification, setNotification] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawerSetting, setOpenDrawerSetting] = useState<boolean>(false);

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleLogout = async () => {
    dispatch({ type: SET_USER, payload: null });
    Cookies.remove('user', { domain: 'admin.localhost', path: '/' });
    Cookies.remove('accessToken', { domain: 'admin.localhost', path: '/' });
    window.location.reload();
  };
  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: React.MouseEvent<HTMLLIElement>, index: number, route: string = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={user.profile_picture}
            sx={{
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef as React.RefObject<HTMLDivElement>}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef as any}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper elevation={16}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box
                    sx={{
                      p: 2,
                      pb: 0,
                    }}
                  >
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{
                            fontWeight: 400,
                          }}
                        >
                          Xin chào,
                        </Typography>
                        <Typography variant="h4">{user.name}</Typography>
                      </Stack>
                      <Typography variant="subtitle2">Vai trò {user.role}</Typography>
                      <Typography variant="subtitle2">{user.email}</Typography>
                    </Stack>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                        pr: 1,
                        pl: 2,
                        my: 2,
                      }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Tìm kiếm"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        pt: 0,
                      }}
                    >
                      <Divider />
                      {/* <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Bật thông báo</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                    name="notification"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider /> */}
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 360,
                          bgcolor: theme.palette.background.paper,
                        }}
                      >
                        <ListItemButton
                          selected={selectedIndex === 0}
                          onClick={(event: any) => handleListItemClick(event, 0, '/profile')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.25rem" />
                          </ListItemIcon>
                          <ListItemText primary="Trang cá nhân" />
                        </ListItemButton>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(_event: any) => {
                            setOpenDrawerSetting(true);
                          }}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.25rem" />
                          </ListItemIcon>
                          <ListItemText primary="Cài đặt" />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.25rem" />
                          </ListItemIcon>
                          <ListItemText primary="Đăng xuất" />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <DrawerSetting open={openDrawerSetting} onClose={() => setOpenDrawerSetting(false)} />
    </>
  );
};

export default ProfileSection;
