import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';

import lodash from 'lodash';
// moment
import moment from 'moment';
// mui
import { Typography } from '@mui/material';
// redux
import { useDispatch } from 'react-redux';
import * as actionTypes from '@/store/actions';
// icon
import { BiBell } from 'react-icons/bi';

// my pj

import Dropdown from '@/components/Dropdown';
import Wrapper from '@/components/Wrapper';

import path from '@/constants/routes';
import Cookies from 'js-cookie';
// socket
import { io } from 'socket.io-client';

// api
import { getNotificationById } from '../../../../api/notification';


interface UserProp {
  user: {
    _id: string;
    name: string;
    email: string;
    nickname: string;
    profile_picture?: string;
    role?: string;
  };
}
const socket = io(import.meta.env.VITE_URL_SERVER);

const LoggedIn: React.FC<UserProp> = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const {
    data: notifications,
    isLoading: isLoadingNoti,
    refetch,
  } = useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotificationById(user._id),
  });

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('user');
    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: '' });
    dispatch({ type: actionTypes.SET_USER, payload: '' });
  };

  const handleNotificationClick = (notification: any) => {
    switch (notification.type) {
      case 'comment':
        const { course_id, resource_id, comment_id } = notification.data;
        navigate(`/learning/${course_id}?id=${resource_id}&comment=${comment_id}`);
        break;
    }
  };

  // socket notification
  useEffect(() => {
    console.log(user._id);

    socket.emit('joinNotificationRoom', user._id);

    socket.on('newNotification', (data) => {
      refetch();
      console.log(data);
    });
    return () => {
      socket.emit('leaveNotificationRoom', user._id);
      socket.off('newNotification');
    };
  }, []);

  if (isLoadingNoti) return <div>Loading...</div>;
  return (
    <>
      <li className={`tw-relative ${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
        <div className={`tw-text-xl`}>
          {!!notifications.length && (
            <span className="tw-absolute -tw-top-2 tw-bg-red-500 -tw-right-3.5 tw-text-white tw-pl-1.5 tw-text-sm tw-rounded-full tw-h-5 tw-w-5">
              {notifications.length}
            </span>
          )}

          {/* thông báo */}
          <HeadlessTippy
            trigger="click"
            placement="top-end"
            interactive
            allowHTML
            render={(attrs) => (
              <Wrapper
                style={{
                  background: theme.palette.background.paper,
                  width: '450px',
                  maxHeight: '70vh',
                  overflow: 'auto',
                }}
                {...attrs}
              >
                <Dropdown.Container>
                  <Dropdown.Header
                    head="Thông báo"
                    hExtend={
                      <div className="tw-flex tw-justify-between">
                        <button className="tw-py-2">Đánh dấu là đã đọc</button>
                        <button className="tw-text-red-500">xóa</button>
                      </div>
                    }
                  />
                  {notifications.length > 0 ? (
                    notifications.map((n: any, index: number) => (
                      <Dropdown.ImageDescription
                        onClick={() => handleNotificationClick(n)}
                        key={index}
                        hover
                        thumbnail={n.data.thumbnail}
                        bodyHead={<Typography dangerouslySetInnerHTML={{ __html: n.data.title }} />}
                        bodyContent={
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: lodash.truncate(n.data.content, { length: 40, omission: '...' }),
                            }}
                          />
                        }
                        bExtend={
                          <p
                            style={{
                              fontSize: 'var(--mini-font-size)',
                            }}
                          >
                            {moment(n.createdAt).fromNow()}
                          </p>
                        }
                      />
                    ))
                  ) : (
                    <Typography textAlign={'center'}>Không có comment</Typography>
                  )}
                </Dropdown.Container>
              </Wrapper>
            )}
          >
            <i className="tw-cursor-pointer tw-select-none">
              <BiBell />
            </i>
          </HeadlessTippy>
        </div>
      </li>
      
      {/* logined */}
      <li className={`${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
        <HeadlessTippy
          trigger="click"
          placement="bottom-end"
          interactive
          allowHTML
          render={(attrs) => (
            <Wrapper
              style={{
                background: theme.palette.background.paper,
              
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '1rem',
              }}
              {...attrs}
            >
              <div className="tw-flex tw-items-center tw-mb-4">
                <img
                  src={user.profile_picture}
                  className="tw-rounded-full tw-h-12 tw-w-12 tw-object-cover tw-max-w-full tw-max-h-full tw-min-w-[48px] tw-min-h-[48px]"
                  alt="User Avatar"
                />
                <div className="tw-ml-3">
                  <p className="tw-font-semibold">{user.name}</p>
                  <p className="tw-text-white-500 tw-text-sm">{user.email}</p>
                </div>
              </div>
              <hr className="tw-my-2" />
              <ul>
                <li className="tw-py-2 tw-cursor-pointer">
                  <Link to={path.client.profile}>Trang cá nhân</Link>
                </li>
                <li className="tw-py-2 tw-cursor-pointer">
                  <Link to={path.client.newPost}>Viết blog</Link>
                </li>
                <li className="tw-py-2 tw-cursor-pointer">
                  <Link to={path.client.myPost}>Bài viết của tôi</Link>
                </li>
                <li className="tw-py-2 tw-cursor-pointer">
                  <Link to={path.client.bookmark}>Bài viết đã lưu</Link>
                </li>
                <li className="tw-py-2 tw-cursor-pointer">
                  <Link to={path.client.setting}>Cài đặt</Link>
                </li>
                <li onClick={handleLogout} className="tw-py-2 tw-text-red-500 tw-cursor-pointer">
                  Đăng xuất
                </li>
              </ul>
            </Wrapper>
          )}
        >
          <div className="tw-cursor-pointer">
            <img
              src={user.profile_picture}
              className="tw-rounded-full tw-h-9 tw-w-9 tw-object-cover tw-max-w-full tw-max-h-full tw-min-w-[36px] tw-min-h-[36px]"
              alt="User Avatar"
            />
          </div>
        </HeadlessTippy>
      </li>
    </>
  );
};
export default LoggedIn;
