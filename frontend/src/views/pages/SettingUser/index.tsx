import { useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditFieldModal from './EditFieldModal';
import PasswordModal from './PasswordModal';
import AvatarUploadModal from './AvatarUploadModal';

import Section from './Section';
import { SectionItem } from './Section';

const sections: SectionItem[] = [
  {
    field: 'Thông tin người dùng',
    section: 'personalInfo',
  },
  {
    field: 'Đổi mật khẩu và bảo mật',
    section: 'securitySettings',
  },
];
const SettingUser: React.FC = () => {
  const theme = useTheme();
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>('personalInfo');
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

  const handleSectionChange = (section: string) => {
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
      .then((_response) => {
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
        <Section
          data={sections}
          onChange={(s) => handleSectionChange(s.section)}
        />
        <div
          className="tw-w-full md:tw-w-3/4 tw-p-8 "
          style={{ background: theme.palette.background.paper }}
        >
          {activeSection === 'personalInfo' && (
            <>
              <h3 className="tw-text-2xl tw-font-semibold tw-mb-2 tw-font-bold">
                Thông tin cá nhân
              </h3>
              <p className="tw-text-xs tw-mb-6 tw-text-gray-400">
                Quản lý thông tin cá nhân của bạn.
              </p>
              <div className="tw-mb-12">
                <h4 className="tw-text-lg tw-font-medium tw-mb-2 ">
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
                    <span className=" ">Họ và tên</span>
                    <p className="">{user.name || 'Chưa cập nhật'}</p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('username', user.username || '')
                    }
                  >
                    <span className=" ">Tên người dùng</span>
                    <p className="">{user.username || 'Chưa cập nhật'}</p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('referring', user.referring || '')
                    }
                  >
                    <span className=" ">Giới thiệu</span>
                    <p className="">{user.referring || 'Chưa cập nhật'}</p>
                  </div>
                  <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4">
                    <span className="">Ảnh đại diện</span>
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
                      onUpload={() => {}}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="tw-text-lg tw-font-medium ">
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
                    <span className=" ">Trang web cá nhân</span>
                    <p className="">
                      {user.personalWebsite || 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() => handleFieldEdit('github', user.github || '')}
                  >
                    <span className=" ">GitHub</span>
                    <p className="">{user.github || 'Chưa cập nhật'}</p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('linkedin', user.linkedin || '')
                    }
                  >
                    <span className=" ">LinkedIn</span>
                    <p className="">{user.linkedin || 'Chưa cập nhật'}</p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('facebook', user.facebook || '')
                    }
                  >
                    <span className=" ">Facebook</span>
                    <p className="">{user.facebook || 'Chưa cập nhật'}</p>
                  </div>
                  <div
                    className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md"
                    onClick={() =>
                      handleFieldEdit('youtube', user.youtube || '')
                    }
                  >
                    <span className=" ">YouTube</span>
                    <p className="">{user.youtube || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'securitySettings' && (
            <>
              <h3 className="tw-text-2xl tw-font-semibold tw-mb-2 tw-font-bold hover:tw-shadow-md ">
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
                  <span className=" ">Đổi mật khẩu</span>
                  <p className="tw-text-xs tw-text-gray-400">
                    Bạn có muốn đổi mật khẩu chứ
                  </p>
                </div>
                <PasswordModal
                  open={openPasswordModal}
                  onClose={handleClosePasswordModal}
                  onSave={handleSavePassword}
                  onForgotPassword={() => {}}
                />
                <div className="tw-border tw-border-gray-300 hover:tw-shadow-md tw-rounded-md tw-p-4">
                  <span className=" ">Xác thực hai yếu tố</span>
                  <p className="">
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
