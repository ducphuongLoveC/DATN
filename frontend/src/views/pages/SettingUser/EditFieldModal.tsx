import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface EditFieldModalProps {
  open: boolean;
  onClose: () => void;
  fieldValue: string;
  setFieldValue: (value: string) => void;
  currentField: string;
  onSave: () => void;
}

const EditFieldModal: React.FC<EditFieldModalProps> = ({
  open,
  onClose,
  fieldValue,
  setFieldValue,
  currentField,
  onSave,
}) => {
  const [error, setError] = React.useState('');

  const handleSave = () => {
    if (fieldValue.trim() === '') {
      setError(`Vui lòng nhập ${currentField.toLowerCase()}`);
      return;
    }
    setError('');
    onSave();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Sửa đổi thông tin
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
          id="fieldValue"
          label={`Nhập ${currentField}`}
          type="text"
          fullWidth
          variant="outlined"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? 'red' : '',
              },
            },
            marginBottom: 2,
          }}
        />
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
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFieldModal;
