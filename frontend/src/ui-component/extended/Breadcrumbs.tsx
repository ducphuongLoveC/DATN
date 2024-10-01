import { useEffect, useState, FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project import
import navigation from '@/menu-items';

// assets
import { IconChevronRight, IconTallymark1 } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

interface BTitleProps {
  title: ReactNode;
}

// ==============================|| BREADCRUMBS TITLE ||============================== //

const BTitle: FC<BTitleProps> = ({ title }) => (
  <Grid item>
    <Typography
      variant="h3"
      sx={{
        fontWeight: 500,
      }}
    >
      {title}
    </Typography>
  </Grid>
);

interface BreadcrumbsProps {
  sx?: object;
  custom?: boolean;
  heading?: string;
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation?: object;
  rightAlign?: boolean;
  separator?: React.ComponentType | ReactNode;
  title?: boolean;
  titleBottom?: boolean;
  links?: Array<{
    to?: string;
    title: string;
    icon?: React.ComponentType;
  }>;
}

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  card = true,
  custom = false,
  divider = true,
  heading,
  icon = true,
  icons,
  links,
  maxItems,
  rightAlign = true,
  separator = IconChevronRight,
  title = true,
  titleBottom,
  sx,
  ...others
}) => {
  const theme = useTheme();
  const location = useLocation();
  const [main, setMain] = useState<any>();
  const [item, setItem] = useState<any>();

  const iconSX = {
    marginRight: 6,
    marginTop: -2,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  const linkSX = {
    display: 'flex',
    color: 'grey.900',
    textDecoration: 'none',
    alignContent: 'center',
    alignItems: 'center',
  };

  const customLocation = location.pathname;

  useEffect(() => {
    navigation?.items?.map((menu: any) => {
      if (menu.type && menu.type === 'group') {
        if (menu?.url && menu.url === customLocation) {
          setMain(menu);
          setItem(menu);
        } else {
          getCollapse(menu);
        }
      }
      return false;
    });
  });

  // set active item state
  const getCollapse = (menu: any) => {
    if (!custom && menu.children) {
      menu.children.filter((collapse: any) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator as React.ComponentType;
  const separatorIcon = separator ? (
    <SeparatorIcon />
  ) : (
    <IconTallymark1 stroke={1.5} size="16px" />
  );

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography
        {...(main.url && {
          component: Link,
          to: main.url,
        })}
        variant="subtitle1"
        sx={linkSX}
        color={
          window.location.pathname === main.url
            ? 'text.primary'
            : 'text.secondary'
        }
      >
        {icons && <CollapseIcon style={iconSX} />}
        {main.title}
      </Typography>
    );
  }

  if (
    !custom &&
    main &&
    main.type === 'collapse' &&
    main.breadcrumbs === true
  ) {
    breadcrumbContent = (
      <Card
        sx={
          card === false
            ? {
                mb: 3,
                bgcolor: 'transparent',
                ...sx,
              }
            : {
                mb: 3,
                bgcolor: 'background.default',
                ...sx,
              }
        }
        {...others}
      >
        <Box
          sx={{
            p: 2,
            pl: card === false ? 0 : 2,
          }}
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={1}
          >
            {title && !titleBottom && <BTitle title={main.title} />}
            <Grid item>
              <MuiBreadcrumbs
                aria-label="breadcrumb"
                maxItems={maxItems || 8}
                separator={separatorIcon}
                sx={{
                  '& .MuiBreadcrumbs-separator': {
                    width: 16,
                    ml: 1.25,
                    mr: 1.25,
                  },
                }}
              >
                <Typography
                  component={Link}
                  to="/"
                  color="textSecondary"
                  variant="subtitle1"
                  sx={linkSX}
                >
                  {icons && <HomeTwoToneIcon style={iconSX} />}
                  {icon && !icons && (
                    <HomeIcon
                      style={{
                        ...iconSX,
                        marginRight: 0,
                      }}
                    />
                  )}
                  {(!icon || icons) && 'Dashboard'}
                </Typography>
                {mainContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && titleBottom && <BTitle title={main.title} />}
          </Grid>
        </Box>
        {card === false && divider !== false && (
          <Divider
            sx={{
              mt: 2,
            }}
          />
        )}
      </Card>
    );
  }

  // items
  if (
    (item && item.type === 'item') ||
    (item?.type === 'group' && item?.url) ||
    custom
  ) {
    itemTitle = item?.title;

    ItemIcon = item?.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant="subtitle1"
        sx={{
          ...linkSX,
          color: 'text.secondary',
        }}
      >
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );

    let tempContent = (
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        maxItems={maxItems || 8}
        separator={separatorIcon}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            width: 16,
            ml: 1.25,
            mr: 1.25,
          },
        }}
      >
        <Typography
          component={Link}
          to="/"
          color="textSecondary"
          variant="subtitle1"
          sx={linkSX}
        >
          {icons && <HomeTwoToneIcon style={iconSX} />}
          {icon && !icons && (
            <HomeIcon
              style={{
                ...iconSX,
                marginRight: 0,
              }}
            />
          )}
          {(!icon || icons) && 'Dashboard'}
        </Typography>
        {mainContent}
        {itemContent}
      </MuiBreadcrumbs>
    );

    if (custom && links && links?.length > 0) {
      tempContent = (
        <MuiBreadcrumbs
          aria-label="breadcrumb"
          maxItems={maxItems || 8}
          separator={separatorIcon}
          sx={{
            '& .MuiBreadcrumbs-separator': {
              width: 16,
              ml: 1.25,
              mr: 1.25,
            },
          }}
        >
          {links?.map((link, index) => {
            CollapseIcon = link.icon ? link.icon : AccountTreeTwoToneIcon;

            return (
              <Typography
                key={index}
                {...(link.to && {
                  component: Link,
                  to: link.to,
                })}
                variant="subtitle1"
                sx={linkSX}
                color={!link.to ? 'text.primary' : 'text.secondary'}
              >
                {link.icon && <CollapseIcon style={iconSX} />}
                {link.title}
              </Typography>
            );
          })}
        </MuiBreadcrumbs>
      );
    }

    // main
    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <Card
          sx={
            card === false
              ? {
                  mb: 3,
                  bgcolor: 'transparent',
                  ...sx,
                }
              : {
                  mb: 3,
                  bgcolor: 'background.default',
                  ...sx,
                }
          }
          {...others}
        >
          <Box
            sx={{
              p: 2,
              pl: card === false ? 0 : 2,
            }}
          >
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <BTitle title={custom ? heading : item?.title} />
              )}
              <Grid item>{tempContent}</Grid>
              {title && titleBottom && (
                <BTitle title={custom ? heading : item?.title} />
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && (
            <Divider
              sx={{
                mt: 2,
              }}
            />
          )}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
