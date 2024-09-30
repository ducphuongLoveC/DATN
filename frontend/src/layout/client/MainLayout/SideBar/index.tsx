import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme, styled, useMediaQuery } from '@mui/material';

import s from './SideBar.module.scss';
import menus, { Props as PropsMenuHome } from '@/menu-items/sidebar-home';

const SideBarStyled = styled('div')<{ theme: any }>(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const SideBar: React.FC = () => {
    // State để lưu URL hiện tại
    const [activeUrl, setActiveUrl] = useState(window.location.pathname);

    const theme = useTheme();

    // Hàm xử lý cập nhật URL khi người dùng chọn liên kết
    const handleLinkClick = (url: string) => {
        setActiveUrl(url);
    };

    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <SideBarStyled theme={theme} className={clsx(s['side-bar'])}>
            <ul className={clsx(s['side-bar-ul'], 'tw-sticky')}>
                {menus.map((m: PropsMenuHome, index: number) => {
                    const Icon: any = m.icon;
                    return (
                        <li key={index}>
                            <Link
                                onClick={() => handleLinkClick(m.url)}
                                style={!downMD ? {

                                    color:
                                        activeUrl === m.url
                                            ? theme.palette.text.secondary
                                            : '',
                                    backgroundColor: activeUrl === m.url
                                        ? '#e8ebed'
                                        : '',
                                } :
                                    {
                                        color:
                                            activeUrl === m.url
                                                ? theme.palette.text.secondary
                                                : ''
                                    }

                                }
                                className={clsx(s['item-side-bar'])}
                                to={m.url}
                            >
                                <i className={clsx(s['icon'])}><Icon /></i>
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
