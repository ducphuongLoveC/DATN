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
import theme from '@/themes';
import { BeatLoader } from 'react-spinners';

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

    const [isLogin, setIsLogin] = useState(false);


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
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
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
                <div className="tw-flex tw-justify-between tw-items-center">
                    {/* Box chứa logo */}
                    <div className="tw-flex tw-items-center">
                        <Link to="/">
                            <img src='/images/ftech-c.png' alt="Logo" width={'60'} />
                        </Link>
                    </div>

                    {/* Box chứa tìm kiếm */}
                    <div className="tw-flex tw-items-center tw-w-1/3 tw-border-solid">
                        <div className={clsx(s['search'], "tw-relative tw-w-full")}>
                            <span className="tw-absolute tw-top-3 tw-left-4">
                                <i className="fa-solid fa-magnifying-glass tw-text-[15px]"></i>
                            </span>

                            <HeadlessTippy
                                visible={searchValue.length > 0}
                                placement='top-start'
                                interactive

                                render={(attrs) => (
                                    <Wrapper
                                        style={{
                                            background: theme.palette.background.paper,
                                            width: '400px',
                                            maxHeight: '70vh',
                                            overflow: 'auto'
                                        }}
                                        {...attrs}
                                    >

                                        {
                                            dataSearch.length > 0 &&
                                            <>
                                                <span className='tw-mb-2'>Kết quả cho '{searchValue}'</span>
                                                <h3>Khóa học</h3>
                                                {dataSearch.map((d: any, i: number) => (
                                                    <ContentSearch key={i}>
                                                        <ImageContentSearch src={d.image} />
                                                        <span>{d.name}</span>
                                                    </ContentSearch>
                                                ))}
                                            </>
                                        }
                                        {
                                            isLoading && <span>Đang tìm '{searchValue}'</span>
                                        }
                                        {
                                            !isLoading && dataSearch.length == 0 && <span>Không tìm thấy kết quả cho '{searchValue}'</span>
                                        }

                                    </Wrapper>
                                )}
                            >
                                <div >
                                    <input
                                        value={searchValue}
                                        className={clsx(`tw-transition tw-w-full tw-text-xm tw-rounded-full tw-p-2.5 tw-pl-12 bg-transparent`)}
                                        style={{
                                            border: `2px solid ${theme.palette.border.borderLv2}`,
                                        }}
                                        placeholder="Search..."
                                        onChange={(e) => handleSearchValue(e.target.value)}
                                    />

                                    {isLoading && <i className='tw-absolute tw-top-3 tw-right-5' ><BeatLoader color='#fff' size={6} /> </i>}
                                    {!isLoading && searchValue.length > 0 && <i onClick={clearSearchValue} className='tw-absolute tw-top-2 tw-right-5'><BiX /></i>}
                                </div>
                            </HeadlessTippy>
                        </div>
                    </div>

                    {/* Box chứa thông báo và nút Login */}
                    <div className="tw-flex tw-items-center tw-justify-center tw-space-x-4">
                        <ul className="tw-list-none tw-flex tw-items-center tw-justify-center">
                            <li className="tw-relative tw-ml-4">
                                <Link to="#" className={`tw-text-xl ${theme.palette.text.primary}`}>
                                    <Tippy content="Thay đổi theme">
                                        <i><BiAdjust onClick={handleToggleThemeMode} /></i>
                                    </Tippy>
                                </Link>
                            </li>

                            {
                                isLogin ? (<>
                                    <li className="tw-relative tw-ml-4">
                                        <Link to="#" className={`tw-text-xl ${theme.palette.text.primary}`}>
                                            <span className="tw-absolute -tw-top-2 tw-bg-red-500 -tw-right-3.5 tw-text-white tw-pl-1.5 tw-text-sm tw-rounded-full tw-h-5 tw-w-5">
                                                2
                                            </span>
                                            <Tippy content="Thông báo">
                                                <i><BiBell /></i>
                                            </Tippy>
                                        </Link>
                                    </li>
                                    <li className="tw-relative tw-ml-4">
                                        <Link to="#" className={`tw-text-xl ${theme.palette.text.primary}`}>
                                            <Tippy content="Khóa học của tôi">
                                                <i><GradientIcon><BiChalkboard fontSize={25} /></GradientIcon></i>
                                            </Tippy>
                                        </Link>
                                    </li>
                                    <li className='tw-ml-4'>
                                        <img src='/images/avatar.jpg' className="tw-rounded-full tw-h-9 tw-w-9" />
                                    </li>
                                </>) : (<>
                                    <li>
                                        <Link to='/auth/register' className="tw-hidden sm:tw-block tw-px-5 tw-py-2 tw-rounded-md">
                                            Đăng ký
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/auth/login'
                                            className="tw-bg-gradient-to-r tw-from-[#00C9FF] tw-to-[#92FE9D] tw-text-white tw-px-4 tw-py-2 tw-rounded-full tw-whitespace-nowrap tw-max-w-max"
                                        >
                                            Đăng nhập
                                        </Link>

                                    </li>
                                </>)
                            }
                        </ul>

                        <div onClick={handleToggleNavMobile} className="tw-cursor-pointer md:tw-hidden tw-flex tw-items-center tw-justify-center">

                            {homeState.opened ? <BiX /> : <BiListUl />}
                        </div>
                    </div>
                </div>


            </div>

            <MobileNavbar isShow={homeState.opened} />
        </nav>
    );
};

export default Navbar;
