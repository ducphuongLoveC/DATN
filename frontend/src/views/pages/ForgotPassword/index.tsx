import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (email) {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?email=${email}`
        );
        if (response.data.length > 0) {
          alert('Mã xác nhận đã được gửi đến địa chỉ email của bạn.');
          setIsCodeSent(true);
          setError('');
        } else {
          setError('Email không tồn tại.');
        }
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        setError('Đã xảy ra lỗi khi kiểm tra email. Vui lòng thử lại.');
      }
    } else {
      setError('Vui lòng nhập email của bạn.');
    }
  };

  const handleResetPassword = () => {
    if (verificationCode) {
      navigate('/setting/forgotpassword/reset');
    } else {
      setError('Vui lòng nhập mã xác nhận.');
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
        <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Quên mật khẩu?</h2>
        <p className="tw-text-gray-500 tw-mb-6">
          Nhập email hoặc username của bạn và chúng tôi sẽ gửi cho bạn mã khôi
          phục mật khẩu.
        </p>
      </div>
      <div className="tw-mb-4">
        <label className="tw-block tw-font-semibold tw-mb-2">
          Email của bạn
        </label>
        <input
          type="email"
          className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
        />
        {error && <p className="tw-text-red-500 tw-mt-2">{error}</p>}
      </div>
      {isCodeSent && (
        <div className="tw-mb-4">
          <label className="tw-block tw-font-semibold tw-mb-2">
            Nhập mã xác nhận
          </label>
          <input
            type="text"
            className="tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Nhập mã xác nhận"
          />
          {error && <p className="tw-text-red-500 tw-mt-2">{error}</p>}
        </div>
      )}
      <div className="tw-flex tw-items-center tw-justify-between tw-mt-6">
        {!isCodeSent ? (
          <button
            className="tw-w-full tw-bg-orange-500 tw-text-white tw-py-3 tw-rounded-md tw-font-semibold"
            onClick={handleSendCode}
          >
            Gửi mã
          </button>
        ) : (
          <button
            className="tw-w-full tw-bg-teal-500 tw-text-white tw-py-3 tw-rounded-md tw-font-semibold"
            onClick={handleResetPassword}
          >
            Đặt lại mật khẩu
          </button>
        )}
      </div>
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

export default ForgotPassword;
