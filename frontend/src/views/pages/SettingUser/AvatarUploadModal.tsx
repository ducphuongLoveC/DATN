import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface AvatarUploadModalProps {
  open: boolean;
  onClose: () => void;
  currentAvatarUrl: string;
  onUpload: (file: File) => void;
}

const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  open,
  onClose,
  currentAvatarUrl,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Ảnh đại diện
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các  bài viết, bình luận, tin nhắn...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            alt="Current Avatar"
            src={currentAvatarUrl}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{
              borderColor: '#6fe0dc',
              color: '#6fe0dc',
              '&:hover': {
                borderColor: '#58bcb9',
                backgroundColor: '#f0fafa',
              },
            }}
          >
            Tải ảnh mới lên
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#757575' }}>
          Hủy
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!selectedFile}
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

export default AvatarUploadModal;
