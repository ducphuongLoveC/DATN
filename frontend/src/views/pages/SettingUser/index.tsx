import { useTheme, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProFile: React.FC = () => {
    const theme = useTheme();
    const [user, setUser] = useState<any>(null);
    const [activeSection, setActiveSection] = useState<'personalInfo' | 'securitySettings'>('personalInfo');

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentField, setCurrentField] = useState<string>('');
    const [fieldValue, setFieldValue] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:3000/users/1').then((response) => {
            setUser(response.data);
        });
    }, []);

    if (!user) {
        return <div>Chưa tìm thấy dữ liệu</div>;
    }

    const handleSectionChange = (section: 'personalInfo' | 'securitySettings') => {
        setActiveSection(section);
    };

    const handleFieldEdit = (field: string, value: string) => {
        setCurrentField(field);
        setFieldValue(value);
        setOpenModal(true);
    };

    const handleSave = () => {
        axios.put(`http://localhost:3000/users/1`, { [currentField]: fieldValue })
            .then(response => {
                setUser((prevUser: any) => ({
                    ...prevUser,
                    [currentField]: fieldValue
                }));
                setOpenModal(false);
            })
            .catch(error => {
                console.error("Lỗi trang việc lấy ra dữ liệu", error);
            });
    };

    return (
        <div className='tw-w-full'  style={{ background: theme.palette.background.default }}>
            <div className="tw-flex tw-w-4/5 tw-min-h-screen tw-bg-gray-100" style={{ background: theme.palette.background.default }}>
                <div className="tw-w-1.5/5 tw-bg-white tw-min-w-60 tw-p-20 tw-border-r-2">
                    <h2 className="tw-text-2xl tw-text-black tw-font-bold tw-mb-3">Cài đặt tài khoản</h2>
                    <p className='tw-mb-3 tw-text-xs tw-text-black'>Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.</p>
                    <div className="tw-space-y-4">
                        <button
                            className={`tw-flex tw-items-center tw-w-full tw-py-2 tw-px-4 tw-rounded-md ${activeSection === 'personalInfo' ? 'tw-bg-[#36404D] tw-text-white' : 'tw-bg-transparent tw-hover:bg-gray-100 tw-text-black'}`}
                            onClick={() => handleSectionChange('personalInfo')}
                        >
                            <span className="tw-font-semibold">Thông tin cá nhân</span>
                        </button>
                        <button
                            className={`tw-flex tw-items-center tw-w-full tw-py-2 tw-px-4 tw-rounded-md ${activeSection === 'securitySettings' ? 'tw-bg-[#36404D] tw-text-white' : 'tw-bg-transparent tw-hover:bg-gray-100 tw-text-black'}`}
                            onClick={() => handleSectionChange('securitySettings')}
                        >
                            <span className="tw-font-semibold">Mật khẩu và bảo mật</span>
                        </button>
                    </div>
                </div>
                
                <div className="tw-w-3/4 tw-p-8 tw-bg-white">
                    {activeSection === 'personalInfo' && (
                        <>
                            <h3 className="tw-text-2xl tw-font-semibold tw-mb-2 tw-font-bold tw-text-black">Thông tin cá nhân</h3>
                            <p className='tw-text-xs tw-mb-6 tw-text-gray-400'>Quản lý thông tin cá nhân của bạn.</p>
                            <div className="tw-mb-12">
                                <h4 className="tw-text-lg tw-font-medium tw-mb-2 tw-text-black">Thông tin cơ bản</h4>
                                <p className='tw-text-xs tw-mb-6 tw-text-black'>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn</p>
                                <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-gap-6">
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('name', user.name || '')}>
                                        <span className="tw-text-gray-500 tw-text-black">Họ và tên</span>
                                        <p className="tw-font-semibold">{user.name || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('username', user.username || '')}>
                                        <span className="tw-text-gray-500 tw-text-black">Tên người dùng</span>
                                        <p className="tw-font-semibold">{user.username || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('referring', user.referring || '')}>
                                        <span className="tw-text-gray-500 tw-text-black">Giới thiệu</span>
                                        <p className="tw-font-semibold">{user.referring || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4">
                                        <span className="tw-text-gray-500 tw-text-black">Ảnh đại diện</span>
                                        <img
                                            src={user.avatar || '/default-avatar.png'}
                                            className="tw-w-20 tw-h-20 tw-rounded-full"
                                            alt="User Avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="tw-text-lg tw-font-medium tw-text-black">Thông tin mạng xã hội</h4>
                                <p className='tw-text-xs tw-mb-6 tw-text-gray-400'>Quản lý và liên kết tới các trang mạng xã hội</p>
                                <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-gap-6">
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('personalWebsite', user.personalWebsite || '')}>
                                        <span className=" tw-text-black">Trang web cá nhân</span>
                                        <p className="tw-font-semibold">{user.personalWebsite || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('github', user.github || '')}>
                                        <span className=" tw-text-black">GitHub</span>
                                        <p className="tw-font-semibold">{user.github || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('linkedin', user.linkedin || '')}>
                                        <span className=" tw-text-black">LinkedIn</span>
                                        <p className="tw-font-semibold">{user.linkedin || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('facebook', user.facebook || '')}>
                                        <span className=" tw-text-black">Facebook</span>
                                        <p className="tw-font-semibold">{user.facebook || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('youtube', user.youtube || '')}>
                                        <span className=" tw-text-black">YouTube</span>
                                        <p className="tw-font-semibold">{user.youtube || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md" onClick={() => handleFieldEdit('tiktok', user.tiktok || '')}>
                                        <span className=" tw-text-black">TikTok</span>
                                        <p className="tw-font-semibold">{user.tiktok || 'Chưa cập nhật'}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {activeSection === 'securitySettings' && (
                        <>
                                                     <h3 className="tw-text-2xl tw-font-semibold tw-mb-2 tw-font-bold tw-text-black">Mật khẩu và bảo mật</h3>
                                                     <p className='tw-mb-10 tw-text-xs tw-text-black'>Cài đặt bảo mật tài khoản của bạn.</p>
                                                     <div className="tw-space-y-4">
                                                         <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4" onClick={() => handleFieldEdit('email', user.email || '')}>
                                                             <span className="tw-text-gray-500 tw-text-black">Email</span>
                                                             <p className="tw-font-semibold">{user.email || 'Chưa cập nhật'}</p>
                                                         </div>
                                                         <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4" onClick={() => handleFieldEdit('password', user.password || '')}>
                                                             <span className="tw-text-gray-500 tw-text-black">Mật khẩu</span>
                                                             <p className="tw-font-semibold">{user.password || 'Chưa cập nhật'}</p>
                                                         </div>
                                                         <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4">
                                                             <span className="tw-text-gray-500 tw-text-black">Xác thực hai yếu tố</span>
                                                             <p className="tw-font-semibold">{user.fa === 'true' ? 'Đã bật' : 'Chưa bật'}</p>
                                                         </div>
                                                     </div>
                                                 </>
                    )}
                </div>
            </div>

            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Sửa đổi thông tin
                    <IconButton aria-label="close" onClick={() => setOpenModal(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fieldValue"
                        label={`Nhập ${currentField}`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Hủy</Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProFile;

