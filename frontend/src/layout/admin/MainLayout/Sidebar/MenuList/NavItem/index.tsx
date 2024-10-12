import React, { forwardRef, Ref, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { MENU_OPEN, SET_MENU } from '@/store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Define types for props
interface ChipProps {
  color: 'default' | 'primary' | 'secondary';
  variant: 'filled' | 'outlined';
  size: 'small' | 'medium';
  label: string;
  avatar?: React.ReactElement; // Ensure avatar is a ReactElement or undefined
}

interface NavItemProps {
  item: {
    id: string;
    title: string;
    caption?: string;
    url?: string;
    target?: boolean;
    external?: boolean;
    disabled?: boolean;
    icon?: React.ComponentType<{
      stroke?: number;
      size?: string;
    }>;
    chip?: ChipProps;
  };
  level: number;
}

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem: React.FC<NavItemProps> = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state: any) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon : any = item.icon;
  const itemIcon = Icon ? (
    <Icon
      stroke={1.5}
      size="1.3rem"
      style={{ color: theme.palette.text.primary }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.includes(item.id) ? 8 : 6,
        height: customization.isOpen.includes(item.id) ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  const itemTarget = item.target ? '_blank' : '_self';

  const ListItemLink = forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<'a'>
  >((props, ref) => (
    <Link
      ref={ref as Ref<HTMLAnchorElement>}
      {...props}
      to={item.url || '/'}
      target={itemTarget}
    />
  ));

  const listItemProps = item.external
    ? {
        component: 'a',
        href: item.url,
        target: itemTarget,
      }
    : {
        component: ListItemLink,
      };

  const itemHandler = (id: string) => {
    dispatch({
      type: MENU_OPEN,
      id,
    });
    if (matchesSM)
      dispatch({
        type: SET_MENU,
        opened: false,
      });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({
        type: MENU_OPEN,
        id: item.id,
      });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
        ':hover': {
          backgroundColor: theme.palette.background.paper2, 
        },
        ':focus': {
          backgroundColor: theme.palette.background.paper2, 
        },
      }}
      selected={customization.isOpen.includes(item.id)}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon
        sx={{
          my: 'auto',
          minWidth: !item.icon ? 18 : 36,
        }}
      >
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={customization.isOpen.includes(item.id) ? 'h5' : 'body1'}
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={
            item.chip.avatar ? <Avatar>{item.chip.avatar}</Avatar> : undefined // Ensure avatar is undefined if not provided
          }
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
