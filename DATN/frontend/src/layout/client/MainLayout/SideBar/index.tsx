import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@mui/material";

import styled from "@emotion/styled";

import { BiSolidHome, BiNews, BiLogoTelegram } from "react-icons/bi";
import s from './SideBar.module.scss';
import menus, { Props as PropsMenuHome } from '@/menu-items/sidebar-home';



const SideBarStyled = styled('div')<{ theme: any }>(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const SideBar: React.FC = () => {

    const theme = useTheme();
    const [indexActive, setIndexActive] = useState<number>(0);

    const handleSetActive = (index: number) => setIndexActive(index);
    return (
        <SideBarStyled
            theme={theme}

            className={clsx(s['side-bar'])}>

            <ul className={clsx(s['side-bar-ul'])}>
                {
                    menus.map((m: PropsMenuHome, index: number) => {

                        const Icon: any = m.icon;
                        return <li key={index}>
                            <Link
                                onClick={() => handleSetActive(index)}
                                style={{
                                    background: index === indexActive ? theme.palette.primary.light : '',
                                    color: index === indexActive ? theme.palette.text.secondary : ''
                                }}
                                className={clsx(s['item-side-bar'])}
                                to={m.url}>
                                <Icon />{m.title}
                            </Link>
                        </li>
                    })
                }
            </ul>
        </SideBarStyled>
    )
}
export default SideBar;