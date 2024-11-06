import { Link } from 'react-router-dom';
const NotLoggedIn = () => {
  return (
    <>
      <li>
        <Link to="/auth/register" className="tw-hidden sm:tw-block tw-px-5 tw-py-2 tw-rounded-md">
          Đăng ký
        </Link>
      </li>
      <li>
        <Link
          to="/auth/login"
          className="tw-bg-gradient-to-r tw-from-[#00C9FF] tw-to-[#92FE9D] tw-text-white tw-px-4 tw-p-2 tw-rounded-full tw-whitespace-nowrap tw-max-w-max"
        >
          Đăng nhập
        </Link>
      </li>
    </>
  );
};

export default NotLoggedIn;
