import { useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditFieldModal from './EditFieldModal';
import PasswordModal from './PasswordModal';
import AvatarUploadModal from './AvatarUploadModal';

const SettingUser: React.FC = () => {
  const theme = useTheme();
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<
    'personalInfo' | 'securitySettings'
  >('personalInfo');
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<string>('');
  const [fieldValue, setFieldValue] = useState<string>('');
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/users/1').then((response) => {
      setUser(response.data);
    });
  }, []);

  if (!user) {
    return <div>Chưa tìm thấy dữ liệu</div>;
  }

  const handleSectionChange = (
    section: 'personalInfo' | 'securitySettings'
  ) => {
    setActiveSection(section);
  };

  const handleFieldEdit = (field: string, value: string) => {
    setCurrentField(field);
    setFieldValue(value);
    setOpenModal(true);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/users/1`, { [currentField]: fieldValue })
      .then((response) => {
        setUser((prevUser: any) => ({
          ...prevUser,
          [currentField]: fieldValue,
        }));
        setOpenModal(false);
      })
      .catch((error) => {
        console.error('Lỗi trang việc lấy ra dữ liệu', error);
      });
  };

  const handleOpenPasswordModal = () => {
    setOpenPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const handleSavePassword = (newPassword: string) => {
    console.log(newPassword);
    handleClosePasswordModal();
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleClosePage = () => {
    navigate('/');
  };

 

  return (
    <div
      className="tw-w-full"
      style={{ background: theme.palette.background.paper }}
    >
      <div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-min-h-screen tw-bg-gray-100">
        <IconButton
          onClick={handleClosePage}
          className="tw-absolute tw-top-4 tw-right-[-20px] md:tw-right-[50px] tw-bg-gray-200 tw-p-2 tw-rounded-full hover:tw-bg-gray-300"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <div
          className="tw-w-full md:tw-w-1/4 tw-p-4 md:tw-p-20  tw-border-r-2"
          style={{ background: theme.palette.background.paper }}
        >
          <h2 className="tw-text-2xl tw-text-black tw-font-bold tw-mb-3">
            Cài đặt tài khoản
          </h2>
          <p className="tw-mb-3 tw-text-xs tw-text-black">
            Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo
            mật, quản lý thông báo, v.v.
          </p>
          <div className="tw-space-y-4">
            <button
              className={`tw-w-full tw-py-2 tw-px-4 tw-rounded-md ${activeSection === 'personalInfo' ? 'tw-bg-[#36404D] tw-text-white' : 'tw-bg-transparent tw-hover:bg-gray-100 tw-text-black'}`}
              onClick={() => handleSectionChange('personalInfo')}
            >
              <span className="tw-font-semibold">Thông tin cá nhân</span>
            </button>
            <button
              className={`tw-w-full tw-py-2 tw-px-4 tw-rounded-md ${activeSection === 'securitySettings' ? 'tw-bg-[#36404D] tw-text-white' : 'tw-bg-transparent tw-hover:bg-gray-100 tw-text-black'}`}
              onClick={() => handleSectionChange('securitySettings')}
            >
              <span className="tw-font-semibold">Mật khẩu và bảo mật</span>
            </button>
          </div>
        </div>
        <div
          className="tw-w-full md:tw-w-3/4 tw-p-8 "
          style={{ background: theme.palette.background.paper }}
        >
          {activeSection === 'personalInfo' && (
            <>
              <h3 className="tw-text-2xl tw-font-semibold tw-mb-2 tw-font-bold tw-text-black">
                Thông tin cá nhân
              </h3>
              <p className="tw-text-xs tw-mb-6 tw-text-gray-400">
                Quản lý thông tin cá nhân của bạn.
              </p>
              <div className="tw-mb-12">
                <h4 className="tw-text-lg tw-font-medium tw-mb-2 tw-text-black">
                  Thông tin cơ bản
                </h4>
                <p className="tw-text-xs tw-mb-6 tw-text-gray-400">
                  Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn
                </p>
                <div className="tw-grid tw-grid-cols-1 md:tw-max-w-[800px] tw-gap-6">
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() => handleFieldEdit('name', user.name || '')}
                  >
                    <span className="tw-text-gray-500 tw-text-black">
                      Họ và tên
                    </span>
                    <p className="tw-text-gray-500">
                      {user.name || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('username', user.username || '')
                    }
                  >
                    <span className="tw-text-gray-500 tw-text-black">
                      Tên người dùng
                    </span>
                    <p className="tw-text-gray-500">
                      {user.username || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('referring', user.referring || '')
                    }
                  >
                    <span className="tw-text-gray-500 tw-text-black">
                      Giới thiệu
                    </span>
                    <p className="tw-text-gray-500">
                      {user.referring || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4">
                    <span className="tw-text-gray-500">Ảnh đại diện</span>
                    <img
                      src={user.avatar}
                      className="tw-w-20 tw-h-20 tw-rounded-full tw-cursor-pointer"
                      alt="User Avatar"
                      onClick={handleAvatarClick}
                    />
                    <AvatarUploadModal
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      currentAvatarUrl={user.avatar}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="tw-text-lg tw-font-medium tw-text-black">
                  Thông tin mạng xã hội
                </h4>
                <p className="tw-text-xs tw-mb-6 tw-text-gray-400">
                  Quản lý và liên kết tới các trang mạng xã hội
                </p>
                <div className="tw-grid tw-grid-cols-1 md:tw-max-w-[800px] tw-md:grid-cols-2 tw-gap-6">
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit(
                        'personalWebsite',
                        user.personalWebsite || ''
                      )
                    }
                  >
                    <span className=" tw-text-black">Trang web cá nhân</span>
                    <p className="tw-text-gray-500">
                      {user.personalWebsite || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() => handleFieldEdit('github', user.github || '')}
                  >
                    <span className=" tw-text-black">GitHub</span>
                    <p className="tw-text-gray-500">
                      {user.github || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('linkedin', user.linkedin || '')
                    }
                  >
                    <span className=" tw-text-black">LinkedIn</span>
                    <p className="tw-text-gray-500">
                      {user.linkedin || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('facebook', user.facebook || '')
                    }
                  >
                    <span className=" tw-text-black">Facebook</span>
                    <p className="tw-text-gray-500">
                      {user.facebook || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('youtube', user.youtube || '')
                    }
                  >
                    <span className=" tw-text-black">YouTube</span>
                    <p className="tw-text-gray-500">
                      {user.youtube || 'Chưa cập nhật'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'securitySettings' && (
            <>
              <h3 className="tw-text-2xl tw-font-semibold tw-mb-2 tw-font-bold hover:tw-shadow-md tw-text-black">
                Mật khẩu và bảo mật
              </h3>
              <p className="tw-mb-10 tw-text-xs tw-text-gray-400">
                Cài đặt bảo mật tài khoản của bạn.
              </p>
              <div className="tw-space-y-4">
                <div
                  className="tw-border tw-border-gray-300 hover:tw-shadow-md tw-rounded-md tw-p-4"
                  onClick={handleOpenPasswordModal}
                >
                  <span className="tw-text-gray-500 tw-text-black">
                    Đổi mật khẩu
                  </span>
                  <p className="tw-text-xs tw-text-gray-400">
                    Bạn có muốn đổi mật khẩu chứ
                  </p>
                </div>
                <PasswordModal
                  open={openPasswordModal}
                  onClose={handleClosePasswordModal}
                  onSave={handleSavePassword}
                />
                <div className="tw-border tw-border-gray-300 hover:tw-shadow-md tw-rounded-md tw-p-4">
                  <span className="tw-text-gray-500 tw-text-black">
                    Xác thực hai yếu tố
                  </span>
                  <p className="tw-text-gray-500">
                    {user.fa === 'true' ? 'Đã bật' : 'Chưa bật'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <EditFieldModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
        currentField={currentField}
        onSave={handleSave}
      />
    </div>
  );
};

export default SettingUser;
