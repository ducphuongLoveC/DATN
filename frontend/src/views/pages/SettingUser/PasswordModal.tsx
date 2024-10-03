import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

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

  const handleSave = () => {
    const isCurrentPasswordValid = validateCurrentPassword(currentPassword);

    if (!isCurrentPasswordValid) {
      setError('Vui lòng nhập mật khẩu hiện tại');
      return;
    }

    if (newPassword === confirmPassword) {
      onSave(newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } else {
      setError('Mật khẩu không khớp');
    }
  };

  const validateCurrentPassword = (password: string) => {
    return password === '123456'; //test pass
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
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: currentPassword === '' && error ? 'red' : '',
              },
            },
          }}
        />
        <TextField
          margin="dense"
          label="Mật khẩu mới"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginTop: '16px' }}
        />
        <TextField
          margin="dense"
          label="Xác nhận mật khẩu"
          type="password"
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginTop: '16px' }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
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
        <Button onClick={onClose} sx={{ color: '#757575' }}>
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: '#36404D',
            '&:hover': {
              backgroundColor: '#38364d ',
            },
          }}
        >
          Đổi mật khẩu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;
