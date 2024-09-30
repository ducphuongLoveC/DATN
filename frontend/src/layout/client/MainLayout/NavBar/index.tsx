import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { Box } from '@mui/material';
import {
    BiAdjust,
    BiBell,
    BiChalkboard,
    BiListUl,
    BiX,
} from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';


import axios from 'axios';


// import my project
import Wrapper from '@/components/Wrapper';
import GradientIcon from '@/components/GradientIcon';
import s from './Navbar.module.scss';


import { TOGGLE_THEME_HOME } from '@/store/actions';
import { useTheme, styled, } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import useDebounce from '@/hooks/useDebounce';
import sleep from '@/utils/useSleep';

import { BeatLoader } from 'react-spinners';
import ImageDescription from '@/components/ImageDescription';

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


const notifications = [
    {
        bodyHead: "Dương Đức Phương",
        bodyContent: "Đã like ảnh của bạn!",
        time: '1 phút trước'
    },
    {
        bodyHead: "Nguyễn Văn A",
        bodyContent: "Đã bình luận về bài viết của bạn!",
        time: '1 phút trước'
    },
    {
        bodyHead: "Trần Thị B",
        bodyContent: "Đã theo dõi bạn!",
        time: '1 phút trước'
    },
];


const courses = [
    {
        title: "Kiến thức nền tảng javascript",
        status: "chưa học khóa này",
    },
    {
        title: "Kiến thức nền tảng javascript",
        status: "chưa học khóa này",
    },
    {
        title: "Kiến thức nền tảng javascript",
        status: "chưa học khóa này",
    },
];

const Navbar: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const homeState = useSelector((state: any) => state.homeReducer);

    const [isLoading, setIsloading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [dataSearch, setDataSearch] = useState([]);

    const [isLogin, setIsLogin] = useState(true);

    const [isShowNavMobile, setIsShowNavMobile] = useState(false);

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


    const handleSearchValue = (value: string) => {
        console.log(value);
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    }
    const clearSearchValue = () => {
        setSearchValue('');
    }

    const handleToggleNavMobile = () => {
        setIsShowNavMobile(!isShowNavMobile);
    }


    // media 
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const downSM = useMediaQuery(theme.breakpoints.down('sm'));



    return (
        <nav
            style={{
                background: theme.palette.background.paper,
            }}
            className={clsx(s['nav'], `tw-p-2.5 tw-sticky tw-top-0 tw-z-50`)}
        >
            <div className={clsx('tw-mx-auto', !downMD ? s['nav-desk'] : s['nav-mobile'])}
            >
                <div className="tw-flex tw-justify-between tw-items-center">
                    {/* Box chứa logo */}
                    <div className="tw-flex tw-items-center">
                        <Link to="/" className='tw-flex tw-items-center'>
                            <img src='/images/ftech-c.png' alt="Logo" width={'60'} />
                        </Link>
                    </div>

                    {/* Box chứa tìm kiếm */}
                    <div className={`tw-flex tw-items-center tw-border-solid ${downSM ? 'tw-w-full' : 'tw-w-1/3'}`}>
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

                                    {isLoading && <i className='tw-absolute tw-top-3 tw-right-5' ><BeatLoader color={`${theme.palette.text.primary}`} size={6} /> </i>}
                                    {!isLoading && searchValue.length > 0 && <i onClick={clearSearchValue} className='tw-absolute tw-top-2 tw-right-5'><BiX /></i>}
                                </div>
                            </HeadlessTippy>
                        </div>
                    </div>

                    {/* Box chứa thông báo và nút Login */}
                    <div className="tw-flex tw-items-center tw-justify-center tw-space-x-4">
                        <ul className="tw-list-none tw-flex tw-items-center tw-justify-center">
                            <li className="tw-relative tw-ml-1">
                                <Link to="#" className={`tw-text-xl ${theme.palette.text.primary}`}>
                                    <Tippy content="Thay đổi theme">
                                        <i><BiAdjust onClick={handleToggleThemeMode} /></i>
                                    </Tippy>
                                </Link>
                            </li>

                            {
                                isLogin ? (<>
                                    <li className={`tw-relative ${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
                                        <div className={`tw-text-xl`}>
                                            <span className="tw-absolute -tw-top-2 tw-bg-red-500 -tw-right-3.5 tw-text-white tw-pl-1.5 tw-text-sm tw-rounded-full tw-h-5 tw-w-5">
                                                2
                                            </span>

                                            {/* thông báo */}
                                            <HeadlessTippy

                                                trigger="click"
                                                placement='top-end'
                                                interactive
                                                allowHTML

                                                render={(attrs) => (
                                                    <Wrapper
                                                        style={{
                                                            background: theme.palette.background.paper,
                                                            width: '350px',
                                                            maxHeight: '70vh',
                                                            overflow: 'auto'
                                                        }}
                                                        {...attrs}
                                                    >
                                                        <ImageDescription.Container>
                                                            <ImageDescription.Header
                                                                head='Thông báo'
                                                                hExtend={(
                                                                    <div className='tw-flex tw-justify-between'>
                                                                        <button className='tw-py-2'>Đánh dấu là đã đọc</button>
                                                                        <button className='tw-text-red-500'>xóa</button>
                                                                    </div>
                                                                )}
                                                            />
                                                            {
                                                                notifications.map((n) =>
                                                                    <ImageDescription.Body
                                                                        hover
                                                                        thumbnail='images/ktnt.png'
                                                                        bodyHead={n.bodyHead}
                                                                        bodyContent={n.bodyContent}
                                                                        bExtend={(
                                                                            <p style={{ fontSize: 'var(--mini-font-size)' }}>{n.time}</p>
                                                                        )}
                                                                    />)
                                                            }
                                                        </ImageDescription.Container>

                                                    </Wrapper>
                                                )}
                                            >
                                                <i className='tw-cursor-pointer tw-select-none'><BiBell /></i>
                                            </HeadlessTippy>

                                        </div>
                                    </li>
                                    <li className={`tw-relative ${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
                                        <Link to="#" className={`tw-text-xl ${theme.palette.text.primary}`}>
                                            {/* khóa học của tôi */}
                                            <HeadlessTippy
                                                trigger="click"
                                                placement='top-start'
                                                interactive
                                                allowHTML

                                                render={(attrs) => (
                                                    <Wrapper style={{
                                                        background: theme.palette.background.paper,
                                                        width: '400px',
                                                    }}>
                                                        <ImageDescription.Container>
                                                            <ImageDescription.Header
                                                                head='Khóa học của tôi'
                                                                hExtend={(
                                                                    <div className='tw-flex tw-justify-between'>
                                                                        <button className='tw-py-2'>Xem tất cả</button>
                                                                    </div>
                                                                )}
                                                            />
                                                            {
                                                                courses.map((c) =>
                                                                    <ImageDescription.Body
                                                                        hover
                                                                        thumbnail='images/ktnt.png'
                                                                        bodyHead={c.title}
                                                                        bodyContent={c.status}
                                                                        bExtend={(
                                                                            <button style={{
                                                                                color:'white',
                                                                                lineHeight: '20px',
                                                                                padding:"0 10px",
                                                                                fontSize: 'var(--mini-font-size)',
                                                                                borderRadius: 'var(--main-border-radius)',
                                                                                background: 'var(--color-primary)'
                                                                            }}
                                                                            >Học ngay
                                                                            </button>
                                                                        )}
                                                                    />)
                                                            }
                                                        </ImageDescription.Container>
                                                    </Wrapper>
                                                )}

                                            >
                                                <i><GradientIcon><BiChalkboard fontSize={25} /></GradientIcon></i>
                                            </HeadlessTippy>


                                        </Link>
                                    </li>
                                    <li className={`${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
                                        <HeadlessTippy
                                            trigger="click"
                                            placement='top-start'
                                            interactive
                                            allowHTML

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
                                                    <span></span>
                                                </Wrapper>
                                            )}
                                        >
                                            <img src='/images/avatar.jpg' className="tw-rounded-full tw-h-9 tw-w-9 tw-object-cover tw-max-w-full tw-max-h-full tw-min-w-[36px] tw-min-h-[36px]" />


                                        </HeadlessTippy>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
