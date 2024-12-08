import React, { useState, useEffect } from 'react';
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
  CircularProgress,
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
  const [preview, setPreview] = useState<string>(currentAvatarUrl);
  const [isUploading, setIsUploading] = useState(false);

  // Hiển thị preview khi chọn ảnh mới
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Kiểm tra loại file hợp lệ
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Chỉ chấp nhận các định dạng JPG, PNG.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      
      await onUpload(selectedFile); 
      setSelectedFile(null);
      setPreview(currentAvatarUrl); 
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
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
          Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            alt="Current Avatar"
            src={preview || currentAvatarUrl || 'fallback-image-url'}
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
        <Button onClick={onClose} sx={{ color: '#757575' }} disabled={isUploading}>
          Hủy
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!selectedFile || isUploading}
          sx={{
            backgroundColor: '#36404D',
            '&:hover': {
              backgroundColor: '#38364d',
            },
          }}
        >
          {isUploading ? <CircularProgress size={24} color="inherit" /> : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarUploadModal;