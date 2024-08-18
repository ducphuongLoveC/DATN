import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
    BiCategoryAlt,
    BiAdjust,
    BiBell,
    BiChalkboard,
    BiListUl,
    BiCloset,
    BiX,
    BiLogIn,
    BiSolidRegistered,
    BiUserPlus,
} from 'react-icons/bi';
import Tippy from '@tippyjs/react';

import HeadlessTippy from '@tippyjs/react/headless';
// import my project
import Wrapper from '@/components/Wrapper';
import GradientIcon from '@/components/GradientIcon';
import s from './Navbar.module.scss';
import MobileNavbar from './MobileNavbar';

import { TOGGLE_THEME_HOME, SET_MENU_HOME_MOBILE } from '@/store/actions';
import { useTheme } from '@mui/material/styles';
import path from '@/constants/routes';

// ==============================|| NAVBAR ||============================== //

const Navbar: React.FC = () => {



    // handle theme
    const theme = useTheme(); // Lấy theme từ hook useTheme
    const dispatch = useDispatch();
    const homeState = useSelector((state: any) => state.homeReducer);

    // set Theme
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

    const handleToggleThemeMode = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
    };

    useEffect(() => {
        dispatch({ type: TOGGLE_THEME_HOME, theme: themeMode });
    }, [dispatch, themeMode]);

    // set navbarMobile
    const [openedMobile, setOpenedMobile] = useState<boolean>(false);
    const handleToggleNavMobile = () => {
        setOpenedMobile(!openedMobile);
    };

    useEffect(() => {
        dispatch({ type: SET_MENU_HOME_MOBILE, opened: openedMobile });
    }, [dispatch, openedMobile]);

    return (
        <nav
            style={{ background: theme.palette.background.paper }}
            className={clsx(s['nav'], `tw-p-2.5 tw-sticky tw-top-0 tw-z-50`)}
        >
            <div className={clsx(s['content-nav'], 'container tw-mx-auto')}>
                <div className="tw-flex tw-justify-between">
                    <div className="tw-flex tw-justify-center tw-items-center">
                        <div>
                            <Link to="/">
                                <img
                                    src="./images/logo.png"
                                    alt="Logo"
                                    className="tw-w-36"
                                />
                            </Link>
                        </div>
                        <div className="tw-hidden md:tw-block tw-ml-8 tw-group tw-relative">
                            <BiCategoryAlt className="tw-w-8 tw-h-8 tw-cursor-pointer" />
                        </div>
                        <div
                            style={{ width: '350px' }}
                            className="tw-hidden md:tw-block tw-ml-16 tw-relative"
                        >
                            <span className="tw-absolute tw-top-2.5 tw-left-4">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                type="search"
                                className="tw-transition tw-w-full tw-text-xs tw-rounded-md tw-p-3 tw-pl-12 tw-bg-slate-100 tw-outline-none tw-outline-1 focus:tw-outline-red-300"
                                placeholder="Search for Tuts, Videos, Tutors etc.."
                            />
                        </div>
                    </div>

                    <div className="tw-flex tw-justify-center tw-items-center tw-pr-4 md:tw-pr-0">
                        <ul className="tw-list-none">
                            <li className="tw-inline-block tw-mx-3 sm:tw-mx-4 md:tw-mx-4 tw-relative tw-group">
                                <Link
                                    to="#"
                                    className={`tw-text-xl ${theme.palette.text.primary}`}
                                >
                                    <Tippy content="Thay đổi theme">
                                        <i>
                                            <BiAdjust
                                                onClick={handleToggleThemeMode}
                                            />
                                        </i>
                                    </Tippy>
                                </Link>
                            </li>

                            <li className="tw-inline-block tw-mx-3 sm:tw-mx-4 md:tw-mx-4 tw-relative tw-group">
                                <Link
                                    to="#"
                                    className={`tw-text-xl ${theme.palette.text.primary}`}
                                >
                                    <span className="tw-absolute -tw-top-2 tw-bg-red-500 -tw-right-3.5 tw-text-white tw-pl-1.5 tw-text-sm tw-rounded-full tw-h-5 tw-w-5">
                                        2
                                    </span>
                                    <Tippy content="Thông báo">
                                        <i>
                                            <BiBell />
                                        </i>
                                    </Tippy>
                                </Link>
                            </li>
                            <li className="tw-inline-block tw-mx-3 sm:tw-mx-4 md:tw-mx-4 tw-relative tw-group">
                                <Link
                                    to="#"
                                    className={`tw-text-xl ${theme.palette.text.primary}`}
                                >
                                    <Tippy content="Khóa học của tôi">
                                        <i>
                                            <GradientIcon>
                                                <BiChalkboard fontSize={25} />
                                            </GradientIcon>
                                        </i>
                                    </Tippy>
                                </Link>
                            </li>
                        </ul>

                        {/* user info */}
                        <div className="tw-ml-5 tw-hidden md:tw-block">
                            <Link
                                to="#"
                                className={`tw-text-xl ${theme.palette.text.primary} tw-rounded-full tw-h-5 tw-w-5 tw-shadow tw-py-1.5 tw-px-2.5`}
                            >
                                <HeadlessTippy
                                    delay={[0, 700]}
                                    interactive
                                    render={(attrs) => (
                                        <Wrapper
                                            style={{
                                                background:
                                                    theme.palette.background
                                                        .paper,
                                            }}
                                            {...attrs}
                                        >
                                            <Link
                                                className="tw-flex tw-bg-indigo-500 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-border-indigo-700 hover:tw-bg-indigo-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-400 focus:tw-ring-opacity-50 transition"
                                                to={path.client.auth.login}
                                            >
                                                {' '}
                                                <BiLogIn /> Login
                                            </Link>
                                            <Link
                                                className="tw-mt-2 tw-flex tw-bg-blue-500 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400 focus:tw-ring-opacity-50 transition"
                                                to={path.client.auth.register}
                                            >
                                                <BiUserPlus />
                                                Register
                                            </Link>
                                        </Wrapper>
                                    )}
                                >
                                    <i className="fa-solid fa-user"></i>
                                </HeadlessTippy>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    onClick={handleToggleNavMobile}
                    className="tw-absolute tw-top-1 tw-right-3 tw-cursor-pointer tw-mt-5"
                >
                    <span
                        style={{ color: theme.palette.text.primary }}
                        className="md:tw-hidden navbar-toggle tw-text-slate-900"
                    >
                        {homeState.opened ? <BiX /> : <BiListUl />}
                    </span>
                </div>
            </div>
            <MobileNavbar isShow={homeState.opened} />
        </nav>
    );
};

export default Navbar;
