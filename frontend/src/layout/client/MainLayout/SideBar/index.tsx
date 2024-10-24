import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme, styled, useMediaQuery, Box } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

import s from './SideBar.module.scss';
import menus, { Props as PropsMenuHome } from '@/menu-items/sidebar-home';

const SideBarStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SideBar: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState(window.location.pathname);

  const theme = useTheme();

  const handleLinkClick = (url: string) => {
    if (url !== activeUrl) {
      setActiveUrl(url);
    }
  };

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SideBarStyled className={clsx(s['side-bar'])}>
      <ul className={clsx(s['side-bar-ul'], 'tw-sticky tw-top-20')}>
        {menus.map((m: PropsMenuHome, index: number) => {
          const Icon = m.icon as SvgIconComponent;
          const isActive = activeUrl === m.url;

          return (
            <li key={index}>
              <Link
                onClick={() => handleLinkClick(m.url)}
                style={{
                  color: isActive ? theme.palette.text.secondary : '',
                  backgroundColor: !downMD && isActive ? '#e8ebed' : '',
                }}
                className={clsx(s['item-side-bar'])}
                to={m.url}
              >
                <i className={clsx(s['icon'])}>{Icon && <Icon />}</i>
                {m.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </SideBarStyled>
  );
};

export default SideBar;
