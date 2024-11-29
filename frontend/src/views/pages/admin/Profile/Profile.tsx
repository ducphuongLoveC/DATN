import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducer';
import s from './Profile.module.scss';
import axiosInstance from '@/api/axiosInstance';
import { SET_USER } from '@/store/actions';
import Cookies from 'js-cookie';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',  // Thêm phone vào formData
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra nếu user chưa được tải, không render giao diện
  if (!user) {
    return <div>Loading...</div>;
  }

  // Lấy thông tin người dùng từ cookies và cập nhật Redux khi trang tải lại
  useEffect(() => {
    const userFromCookies = Cookies.get('user');
    if (userFromCookies) {
      const userObj = JSON.parse(userFromCookies);
      dispatch({ type: SET_USER, payload: userObj });
    }
  }, [dispatch]);

  // Xử lý thay đổi trong input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý lưu thông tin
  const handleSave = async () => {
    if (!user?.id && !user?._id) {  // Kiểm tra cả id và _id
      setError('Không tìm thấy thông tin người dùng!');
      return;
    }

    setLoading(true);
    setError(null); // Reset lỗi trước khi gửi yêu cầu

    try {
      const response = await axiosInstance.put(`api/user/users/${user._id || user.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Cập nhật thông tin thành công!');

        // Cập nhật lại thông tin người dùng trong Redux
        const updatedUser = { ...user, ...formData };
        dispatch({ type: SET_USER, payload: updatedUser });

        // Cập nhật lại thông tin người dùng trong Cookies
        Cookies.set('user', JSON.stringify(updatedUser), { domain: 'admin.localhost', expires: 7 });

        setIsEditing(false);
      } else {
        setError(response.data.message || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error(error);
      setError('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="main-body">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">User</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>
        {/* /Breadcrumb */}
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className={clsx(s['card-body-user'])}>
                <div className="d-flex flex-column align-items-center text-center">
                  <img src={user.thumbnail} alt="Admin" className={clsx(s['rounded-circle'])} width={150} />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="mb-1">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className={clsx(s['card-body'])}>
                {/* Họ và tên */}
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-10">Họ và tên:</h6>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <span>{user.name}</span>
                    )}
                  </div>
                </div>
                <hr />

                {/* Phone */}
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-10">Phone:</h6>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      <span>{user.phone}</span>
                    )}
                  </div>
                </div>
                <hr />

                {/* Email (Hiển thị nhưng không chỉnh sửa) */}
                <div className="row align-items-center">
                  <div className="col-sm-3">
                    <h6 className="mb-10">Email:</h6>
                  </div>
                  <div className="col-sm-9">
                    <span>{user.email}</span>
                  </div>
                </div>
                <hr />

                {/* Hiển thị lỗi nếu có */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Nút Edit và Save */}
                {isEditing ? (
                  <button
                    className={clsx(s['button-edit-profile'])}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                ) : (
                  <button
                    className={clsx(s['button-edit-profile'])}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
