import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';

const PasswordModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (newPassword: string) => void;
  onForgotPassword: () => void;
}> = ({ open, onClose, onSave, onForgotPassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.authReducer.user); 


  const handleSave = async () => {
    // Validation trước khi gửi request
    if (!currentPassword) {
      setError('Vui lòng nhập mật khẩu hiện tại');
      return;
    }

    if (!newPassword) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }

    if (!confirmPassword) {
      setError('Vui lòng xác nhận mật khẩu mới');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    // Kiểm tra user
    if (!user?._id) {
      setError('Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('Sending request with data:', {
        userId: user._id,
        currentPassword,
        newPassword
      });

      const response = await axiosInstance.post(`/api/user/${user._id}/change-password`, {
        userId: user._id,
        currentPassword,
        newPassword
      });

      console.log('Response:', response);

      if (response.data.success) {
        onSave(newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        onClose();
      } else {
        setError(response.data.message || 'Có lỗi xảy ra');
      }
    } catch (err: any) {
      console.error('Error details:', err);
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError(err.response.data.message || 'Dữ liệu không hợp lệ');
            break;
          case 401:
            setError('Mật khẩu hiện tại không chính xác');
            break;
          case 404:
            setError('Không tìm thấy thông tin người dùng');
            break;
          case 500:
            setError('Lỗi server, vui lòng thử lại sau');
            break;
          default:
            setError('Đã có lỗi xảy ra, vui lòng thử lại');
        }
      } else if (err.request) {
        setError('Không thể kết nối đến máy chủ');
      } else {
        setError('Đã có lỗi xảy ra, vui lòng thử lại');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Đổi mật khẩu
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Mật khẩu hiện tại"
          type="password"
          fullWidth
          variant="outlined"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={!currentPassword && !!error}
          helperText={!currentPassword && !!error ? 'Vui lòng nhập mật khẩu hiện tại.' : ''}
        />
        <TextField
          margin="dense"
          label="Mật khẩu mới"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!newPassword && !!error}
          helperText={!newPassword && !!error ? 'Vui lòng nhập mật khẩu mới.' : ''}
        />
        <TextField
          margin="dense"
          label="Xác nhận mật khẩu"
          type="password"
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={newPassword !== confirmPassword && !!error}
          helperText={
            newPassword !== confirmPassword && !!error
              ? 'Mật khẩu xác nhận không khớp.'
              : ''
          }
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Typography
          variant="body2"
          onClick={onForgotPassword}
          sx={{
            cursor: 'pointer',
            color: '#ec5e5e',
            textDecoration: 'underline',
            marginTop: '12px',
          }}
        >
          Bạn quên mật khẩu ư?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#757575' }} disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: '#36404D',
            '&:hover': {
              backgroundColor: '#38364d',
            },
          }}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;
