import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

// redux
import { useDispatch, UseDispatch } from 'react-redux';
import * as actionTypes from '@/store/actions';
// icon
import { BiBell, BiChalkboard } from 'react-icons/bi';

// my pj

import Dropdown from '@/components/Dropdown';
import Wrapper from '@/components/Wrapper';
import GradientIcon from '@/components/GradientIcon';
import path from '@/constants/routes';
import Cookies from 'js-cookie';
//
const notifications = [
  {
    bodyHead: 'Dương Đức Phương',
    bodyContent: 'Đã like ảnh của bạn!',
    time: '1 phút trước',
  },
  {
    bodyHead: 'Nguyễn Văn A',
    bodyContent: 'Đã bình luận về bài viết của bạn!',
    time: '1 phút trước',
  },
  {
    bodyHead: 'Trần Thị B',
    bodyContent: 'Đã theo dõi bạn!',
    time: '1 phút trước',
  },
];

const courses = [
  {
    title: 'Kiến thức nền tảng javascript',
    status: 'chưa học khóa này',
  },
  {
    title: 'Kiến thức nền tảng javascript',
    status: 'chưa học khóa này',
  },
  {
    title: 'Kiến thức nền tảng javascript',
    status: 'chưa học khóa này',
  },
];
interface UserProp {
  user: {
    name: string;
    email: string;
    nickname: string;
    profile_picture?: string;
    role?: string;
  };
}

const LoggedIn: React.FC<UserProp> = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('user');
    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: '' });
    dispatch({ type: actionTypes.SET_USER, payload: '' });
  };
  return (
    <>
      <li className={`tw-relative ${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
        <div className={`tw-text-xl`}>
          <span className="tw-absolute -tw-top-2 tw-bg-red-500 -tw-right-3.5 tw-text-white tw-pl-1.5 tw-text-sm tw-rounded-full tw-h-5 tw-w-5">
            2
          </span>
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
                  width: '350px',
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
                  {notifications.map((n, index) => (
                    <Dropdown.ImageDescription
                      key={index}
                      hover
                      thumbnail="images/ktnt.png"
                      bodyHead={n.bodyHead}
                      bodyContent={n.bodyContent}
                      bExtend={
                        <p
                          style={{
                            fontSize: 'var(--mini-font-size)',
                          }}
                        >
                          {n.time}
                        </p>
                      }
                    />
                  ))}
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
      <li className={`tw-relative ${downSM ? 'tw-ml-1' : 'tw-ml-4'}`}>
        <Link to="#" className={`tw-text-xl ${theme.palette.text.primary}`}>
          {/* khóa học của tôi */}
          <HeadlessTippy
            trigger="click"
            placement="top-start"
            interactive
            allowHTML
            render={(attrs) => (
              <Wrapper
                {...attrs}
                style={{
                  background: theme.palette.background.paper,
                  width: '400px',
                }}
              >
                <Dropdown.Container>
                  <Dropdown.Header
                    head="Khóa học của tôi"
                    hExtend={
                      <div className="tw-flex tw-justify-between">
                        <button className="tw-py-2">Xem tất cả</button>
                      </div>
                    }
                  />
                  {courses.map((c, index) => (
                    <Dropdown.ImageDescription
                      key={index}
                      hover
                      thumbnail="images/ktnt.png"
                      bodyHead={c.title}
                      bodyContent={c.status}
                      bExtend={
                        <button
                          style={{
                            color: 'white',
                            lineHeight: '20px',
                            padding: '0 10px',
                            fontSize: 'var(--mini-font-size)',
                            borderRadius: 'var(--main-border-radius)',
                            background: 'var(--color-primary)',
                          }}
                        >
                          Học ngay
                        </button>
                      }
                    />
                  ))}
                </Dropdown.Container>
              </Wrapper>
            )}
          >
            <i>
              <GradientIcon>
                <BiChalkboard fontSize={25} />
              </GradientIcon>
            </i>
          </HeadlessTippy>
        </Link>
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
                width: '250px',
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
                  <p className="tw-text-white-500 tw-text-sm">@{user.nickname}</p>
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
