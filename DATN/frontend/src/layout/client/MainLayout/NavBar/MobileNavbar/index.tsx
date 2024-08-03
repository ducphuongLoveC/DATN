import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import clsx from 'clsx';
import s from './MobileNavbar.module.scss';

import menuItems from '@/menu-items/menu_mobile';
import ItemCollapse from './ItemCollapse';
import Item from './Item';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';



interface MobileNavbarProp {
    isShow: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProp> = ({ isShow = false }) => {
    const theme = useTheme(); // Lấy theme từ hook useTheme

    return (
        <div
            style={{ background: theme.palette.background.paper }}
            className={clsx(
                s['mobile-navbar'],
                { [s.show]: isShow },
                `tw-h-[102vh] tw-absolute tw-top-0 tw-left-0 tw-text-left tw-shadow tw-overflow-y`
            )}
        >
            <div className="tw-text-center tw-pt-2 tw-flex tw-items-center tw-mt-3">
                <Link to="index.html" className="tw-m-0 tw-mx-auto">
                    <img src="./images/logo.png" alt="Logo" className="tw-w-36" />
                </Link>
            </div>
            <div className="tw-p-5">
                <div className="tw-relative">
                    <span className="tw-absolute tw-top-2.5 tw-left-4">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                        type="search"
                        className="tw-transition tw-w-full tw-text-xs tw-rounded-md tw-p-3 tw-pl-12"
                        style={{
                            backgroundColor: theme.palette.background.default, // Áp dụng màu nền từ theme
                            borderColor: theme.palette.divider // Áp dụng màu border từ theme
                        }}
                        placeholder="Search for Tuts, Videos, Tutors etc.."
                    />
                </div>
                <ul className="tw-mt-3 tw-list-none">

                    {
                        menuItems.item.map((item: any, i: number) => {
                            if (item?.children?.length) return <ItemCollapse key={i} item={item} />
                            return <Item key={i} item={item} />
                        })
                    }

                </ul>
            </div>
        </div>
    );
};

export default MobileNavbar;
