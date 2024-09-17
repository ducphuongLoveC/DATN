import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import clsx from 'clsx';
import { RiLoader4Fill } from "react-icons/ri";
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
    BiCart
} from 'react-icons/bi';
import Tippy from '@tippyjs/react';

import HeadlessTippy from '@tippyjs/react/headless';

import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

// import my project
import Wrapper from '@/components/Wrapper';
import GradientIcon from '@/components/GradientIcon';
import s from './Navbar.module.scss';
import MobileNavbar from './MobileNavbar';

import { TOGGLE_THEME_HOME, SET_MENU_HOME_MOBILE } from '@/store/actions';
import { useTheme } from '@mui/material/styles';

import useDebounce from '@/hooks/useDebounce';
import sleep from '@/utils/useSleep';

// ==============================|| NAVBAR ||============================== //


const ContentSearch = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '10px 15px'

}));
const ImageContentSearch = styled('img')(({ theme }) => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px'

}))

const Navbar: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const homeState = useSelector((state: any) => state.homeReducer);

    const [isLoading, setIsloading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [dataSearch, setDataSearch] = useState([]);

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {

        const fetch = async () => {
            try {
                setIsloading(true);
                const { data } = await axios.get(`https://freetestapi.com/api/v1/products?search=${searchValue}&limit=7`);
                await sleep(2000);
                setDataSearch(data);

                setIsloading(false);

            } catch (error) {
                console.log(error);
            }
        }
        if (searchValue) {
            fetch();
        }
    }, [debounced])


    const handleToggleThemeMode = () => {
        const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
        dispatch({
            type: TOGGLE_THEME_HOME,
            theme: newTheme,
        });
    };

    const handleToggleNavMobile = () => {
        dispatch({
            type: SET_MENU_HOME_MOBILE,
            opened: !homeState.opened,
        });
    };

    const handleSearchValue = (value: string) => {
        console.log(value);

        setSearchValue(value.trim());
    }
    const clearSearchValue = () => {
        setSearchValue('');
    }

    return (
        <nav
            style={{
                background: theme.palette.background.paper,
            }}
            className={clsx(s['nav'], `tw-p-2.5 tw-sticky tw-top-0 tw-z-50`)}
        >
            <div className={clsx(s['content-nav'], 'tw-mx-auto')}>
                <div className="tw-flex tw-justify-between">
                    <div className={clsx(s['box-left'], "tw-flex tw-items-center")}>
                        <div className={clsx(s['logo'])}>
                            <Link to="/">
                                <img alt="Logo" className="tw-w-10" />
                            </Link>
                        </div>
                        <div

                            className={clsx(s['search'], "tw-relative")}
                        >
                            <span className="tw-absolute tw-top-3.5 tw-left-4">
                                <i className="fa-solid fa-magnifying-glass tw-text-[20px]"></i>
                            </span>

                            <HeadlessTippy
                                visible={searchValue.length > 0 ? true : false}
                                placement='top-start'
                                interactive
                                arrow
                                appendTo={() => document.body}
                                render={(attrs) => (
                                    <Wrapper
                                        style={{
                                            background:
                                                theme.palette.background
                                                    .paper,
                                            width: '400px',
                                            maxHeight: '70vh',
                                            overflow: 'auto'

                                        }}
                                        {...attrs}
                                    >

                                        {
                                            dataSearch.length ?
                                                <>
                                                    <h3>Khóa học</h3>

                                                    {
                                                        dataSearch.map((d: any, i: number) => (

                                                            <ContentSearch key={i}>
                                                                <ImageContentSearch src={d.image} />
                                                                <span>{d.name}</span>
                                                            </ContentSearch>
                                                        ))
                                                    }
                                                </>
                                                : <span>Không tìm thấy kết quả cho '{searchValue}'</span>
                                        }
                                    </Wrapper>
                                )}
                            >
                                <div>
                                    <input
                                        value={searchValue}

                                        className={`tw-transition tw-w-full tw-text-xm tw-rounded-md tw-p-3 tw-pl-12  tw-outline-${theme.palette.background.paper2} bg-transparent`}
                                        placeholder="Search..."
                                        onChange={(e) => handleSearchValue(e.target.value)}
                                    />
                                    {
                                        isLoading && <i className='tw-absolute tw-top-2.5 tw-right-5 tw-animate-spin'> <RiLoader4Fill style={{ width: '20px' }} /></i>
                                    }
                                    {
                                        searchValue.length ? <i onClick={clearSearchValue} className='tw-absolute tw-top-2.5 tw-right-0'> <BiX /> </i> : <></>
                                    }
                                </div>
                            </HeadlessTippy>

                        </div>
                    </div>

                    <div className={clsx(s['box-right'], "tw-flex tw-justify-center tw-items-center md:tw-pr-0")}>
                        <ul className="tw-list-none">
                            <li className="tw-inline-block tw-mx-2 sm:tw-mx-2 md:tw-mx-4 tw-relative tw-group">
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

                            <li className="tw-inline-block tw-mx-2 sm:tw-mx-2 md:tw-mx-4 tw-relative tw-group">
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
                            <li className="tw-inline-block tw-mx-2 sm:tw-mx-2 md:tw-mx-4 tw-relative tw-group">
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

                        <Link to={'/auth/login'} style={{
                            background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
                            borderRadius: '10px',
                            color: 'white',
                            padding: ' 5px 20px 5px 20px',
                            marginBottom: '7px',
                        }}>Login</Link>
                        <li style={{
                        }}><div

                            onClick={handleToggleNavMobile}
                            className="tw-absolute tw-top-1 tw-right-3 tw-cursor-pointer tw-mt-5"
                        >
                                <span
                                    style={{
                                        color: theme.palette.text.primary,

                                    }}
                                    className="md:tw-hidden navbar-toggle tw-text-slate-900"
                                >
                                    {homeState.opened ? <BiX /> : <BiListUl />}
                                </span>
                            </div></li>
                    </div>
                </div>

            </div>

            <MobileNavbar isShow={homeState.opened} />
        </nav>
    );
};

export default Navbar;
