import React, { useState } from 'react';
import { useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [logoutOtherDevices, setLogoutOtherDevices] = useState(false);
  const navigate = useNavigate();
  const handleResetPassword = () => {
    if (password === '') {
      setError('Mật khẩu không được để trống');
    } else if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
    } else {
      setError('');
      alert('Đặt lại mật khẩu thành công!');
    }
  };

  const handleClosePage = () => {
    navigate('/');
  };

  return (
    <div
      style={{ background: theme.palette.background.default }}
      className="tw-max-w-lg tw-mx-auto  tw-shadow-lg tw-rounded-lg tw-p-8 tw-mt-10"
    >
      <IconButton
        onClick={handleClosePage}
        className="tw-absolute tw-top-4 tw-right-[-20px] md:tw-right-[50px] tw-bg-gray-200 tw-p-2 tw-rounded-full hover:tw-bg-gray-300"
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <button
        className="tw-text-gray-600 tw-mb-4"
        onClick={() => window.history.back()}
      >
        Quay lại
      </button>
      <div className="tw-text-center">
        <div className=" tw-w-1/4 tw-inline-block tw-rounded-full tw-px-4 tw-py-2 tw-mb-4">
          <img src={'/public/images/ftech-logo.png'} alt="" />
        </div>
        <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Đặt lại mật khẩu</h2>
        <p className="tw-text-gray-500 tw-mb-6">
          Đặt mật khẩu mới cho tài khoản của bạn để có thể tiếp tục truy cập các
          khóa học.
        </p>
      </div>

      <div className="tw-mb-4">
        <label className="tw-block tw-font-semibold tw-mb-2">
          Mật khẩu mới
        </label>
        <input
          type="password"
          className={`tw-w-full tw-p-3 tw-border ${error ? 'tw-border-red-500' : 'tw-border-gray-300'} tw-rounded-md`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
        />
        {error && password === '' && (
          <p className="tw-text-red-500 tw-mt-2">{error}</p>
        )}
      </div>

      <div className="tw-mb-4">
        <label className="tw-block tw-font-semibold tw-mb-2">
          Nhập lại mật khẩu mới
        </label>
        <input
          type="password"
          className={`tw-w-full tw-p-3 tw-border ${error && confirmPassword !== password ? 'tw-border-red-500' : 'tw-border-gray-300'} tw-rounded-md`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu mới"
        />
        {error && confirmPassword !== password && password !== '' && (
          <p className="tw-text-red-500 tw-mt-2">{error}</p>
        )}
      </div>

      <div className="tw-flex tw-items-center tw-mb-6">
        <input
          type="checkbox"
          className="tw-mr-2"
          checked={logoutOtherDevices}
          onChange={(e) => setLogoutOtherDevices(e.target.checked)}
        />
        <label>Đăng xuất khỏi các thiết bị khác</label>
      </div>

      <button
        className="tw-w-full tw-bg-teal-500 tw-text-white tw-py-3 tw-rounded-md tw-font-semibold"
        onClick={handleResetPassword}
      >
        Đặt lại mật khẩu
      </button>

      <p className="tw-text-center tw-text-sm tw-text-gray-500 tw-mt-6">
        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
        <a href="#" className="tw-text-blue-500 hover:tw-underline">
          điều khoản sử dụng
        </a>{' '}
        của chúng tôi.
      </p>
    </div>
  );
};

export default ResetPassword;
