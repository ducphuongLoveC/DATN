import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonBase from '@mui/material/ButtonBase';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';

import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons-react';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notification',
  },
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'unread',
    label: 'Unread',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection: React.FC = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setValue(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase
          sx={{
            borderRadius: '12px',
            // boxShadow: theme.shadows[16],
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <IconBell stroke={1.5} size="1.3rem" />
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
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
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? 'top' : 'top-right'}
            in={open}
            {...TransitionProps}
          >
            <Paper
              elevation={16}
              sx={{
                boxShadow: theme.shadows[16],
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  content={false}
                  sx={{
                    boxShadow: theme.shadows[16],
                  }}
                >
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          pt: 2,
                          px: 2,
                        }}
                      >
                        <Grid item>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="subtitle1">
                              All Notification
                            </Typography>
                            <Chip
                              size="small"
                              label="01"
                              sx={{
                                color: theme.palette.background.default,
                                bgcolor: theme.palette.warning.dark,
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Typography
                            component={Link}
                            to="#"
                            variant="subtitle2"
                            color="primary"
                          >
                            Mark as all read
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <PerfectScrollbar
                        style={{
                          height: '100%',
                          maxHeight: 'calc(100vh - 205px)',
                          overflowX: 'hidden',
                        }}
                      >
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                px: 2,
                                pt: 0.25,
                              }}
                            >
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                value={value}
                                onChange={handleChange}
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                {status.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Box>
                          </Grid>
                          <Grid item xs={12} p={0}>
                            <Divider
                              sx={{
                                my: 0,
                              }}
                            />
                          </Grid>
                        </Grid>
                        <NotificationList />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions
                    sx={{
                      p: 1.25,
                      justifyContent: 'center',
                    }}
                  >
                    <Button size="small" disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
