import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { Box } from '@mui/material';
import { BiAdjust, BiX } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

// import my project
import Logo from '@/ui-component/Logo';
import Wrapper from '@/components/Wrapper';
import s from './Header.module.scss';

import { TOGGLE_THEME_HOME } from '@/store/actions';
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import useDebounce from '@/hooks/useDebounce';

import { BeatLoader } from 'react-spinners';

import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';
import { RootState } from '@/store/reducer';
import { getCourseSearch } from '@/api/courseApi';
import path from '@/constants/routes';


// ==============================|| NAVBAR ||============================== //

const ContentSearch = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '5px 10px',
}));
const ImageContentSearch = styled('img')(() => ({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  marginRight: '10px',
}));


const Header: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.homeReducer);
  const authState = useSelector((state: RootState) => state.authReducer);

  const [isLoading, setIsloading] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [dataSearch, setDataSearch] = useState([]);

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsloading(true);
        const { data } = await getCourseSearch(searchValue);
        // await sleep(2000);
        setDataSearch(data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchValue) {
      fetch();
    }
  }, [debounced]);

 

  const handleToggleThemeMode = () => {
    const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
    dispatch({
      type: TOGGLE_THEME_HOME,
      theme: newTheme,
    });
  };

  const handleSearchValue = (value: string) => {
    console.log(value);
    if (!value.startsWith('')) {
      setSearchValue(value);
    }
  };
  const clearSearchValue = () => {
    setSearchValue('');
  };

  // media
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {authState.user && authState.user.role === 'admin' && (
        <div
          style={{
            width: '100%',
            backgroundColor: theme.palette.background.paper2,
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <nav className={clsx(s['nav'])}>
            <ul className="tw-list-none tw-flex tw-items-center">
              <li className="">
                <Link to={'to'}>Xin chào admin {authState.user.name} !</Link>
              </li>
              <li className="tw-ml-10">
                <Link
                  to={
                    import.meta.env.VITE_URL_ADMIN +
                    `?accessToken=${encodeURIComponent(JSON.stringify(authState.accessToken))}&info=${encodeURIComponent(JSON.stringify(authState.user))}`
                  }
                >
                  Đăng nhập vào quản trị nội dung
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <nav
        style={{
          background: theme.palette.background.paper,
        }}
        className={clsx(s['nav'], `tw-p-2.5 tw-sticky tw-top-0 tw-z-50`)}
      >
        <div className={clsx('tw-mx-auto', !downMD ? s['nav-desk'] : s['nav-mobile'])}>
          <div className="tw-flex tw-justify-between tw-items-center">
            {/* Box chứa logo */}
            {!downSM && (
              <div className="tw-flex tw-items-center">
                <Link to="/" className="tw-flex tw-items-center">
                  <Logo />
                  <span className="tw-font-bold">Lập trình Ftech</span>
                </Link>
              </div>
            )}

            {/* Box chứa tìm kiếm */}
            <div className={`tw-flex tw-items-center tw-border-solid ${downSM ? 'tw-w-full' : 'tw-w-1/3'}`}>
              <div className={clsx(s['search'], 'tw-relative tw-w-full')}>
                <span className="tw-absolute tw-top-3 tw-left-4">
                  <i className="fa-solid fa-magnifying-glass tw-text-[15px]"></i>
                </span>

                <HeadlessTippy
                  visible={searchValue.length > 0}
                  placement="top-start"
                  interactive
                  render={(attrs) => (
                    <Wrapper
                      style={{
                        background: theme.palette.background.paper,
                        width: '400px',
                        maxHeight: '70vh',
                        overflow: 'auto',
                      }}
                      {...attrs}
                    >
                      {dataSearch.length > 0 && (
                        <>
                          <span>Kết quả cho '{searchValue}'</span>
                          <h6>Khóa học</h6>
                          {dataSearch.map((c: any, i: number) => (
                            <Link to={path.client.learningId(c._id)}>
                              <ContentSearch key={i}>
                                <ImageContentSearch src={c.thumbnail} />
                                <span>{c.title}</span>
                              </ContentSearch>
                            </Link>
                          ))}
                        </>
                      )}
                      {isLoading && <span>Đang tìm '{searchValue}'</span>}
                      {!isLoading && dataSearch.length == 0 && <span>Không tìm thấy kết quả cho '{searchValue}'</span>}
                    </Wrapper>
                  )}
                >
                  <div>
                    <input
                      value={searchValue}
                      className={clsx(
                        `tw-transition tw-w-full tw-text-xm tw-rounded-full tw-p-2.5 tw-pl-12 bg-transparent`
                      )}
                      style={{
                        border: `2px solid ${theme.palette.border.borderLv2}`,
                      }}
                      placeholder="Tìm kiếm khóa học"
                      onChange={(e) => handleSearchValue(e.target.value)}
                    />

                    {isLoading && (
                      <i className="tw-absolute tw-top-3 tw-right-5">
                        <BeatLoader color={`${theme.palette.text.primary}`} size={6} />{' '}
                      </i>
                    )}
                    {!isLoading && searchValue.length > 0 && (
                      <i onClick={clearSearchValue} className="tw-absolute tw-top-2 tw-right-5">
                        <BiX />
                      </i>
                    )}
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
                      <i>
                        <BiAdjust onClick={handleToggleThemeMode} />
                      </i>
                    </Tippy>
                  </Link>
                </li>
                {authState?.accessToken ? <LoggedIn user={authState.user} /> : <NotLoggedIn />}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
