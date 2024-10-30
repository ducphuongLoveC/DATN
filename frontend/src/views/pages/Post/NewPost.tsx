import { useState } from 'react';

import TextEditor from '@/components/TextEditor';
 
import {
  Box,
  Input,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import the camera icon
const NewPost: React.FC = () => {
  const [post, setPost] = useState<{ title: string; content: string; thumbnail: string | null }>({
    title: '',
    content: '',
    thumbnail: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prevPost) => ({
      ...prevPost,
      title: event.target.value,
    }));
  };
  const handleContentChange = (content: string) => {
    setPost((prevPost) => ({
      ...prevPost,
      content,
    }));
  };
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedThumbnail = event.target.files[0];
      
      const previewUrl = URL.createObjectURL(selectedThumbnail);
      setThumbnailPreview(previewUrl);

      setPost((prevPost) => ({
        ...prevPost,
        thumbnail: previewUrl,
      }));
    }
  };
//   modal handle
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box p={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={7} sm={10} display="flex" alignItems="center">
          <Input
            fullWidth
            placeholder="Tiêu đề"
            sx={{ fontSize: '24px' }}
            value={post.title}
            onChange={handleTitleChange}
          />
          <Grid item>
            {thumbnailPreview && (
              <Box ml={2}>
                <img
                  src={thumbnailPreview}
                  alt="Uploaded Thumbnail"
                  onClick={handleOpen}
                  style={{
                    width: '150px', 
                    height: 'auto', 
                    objectFit: 'cover', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                  }}
                />
              </Box>
            )}
          </Grid>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            onChange={handleThumbnailChange} 
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              component="span"
            >
              <PhotoCameraIcon fontSize="large" />
            </IconButton>
          </label>
        </Grid>
        
        <Grid item xs={5} sm={2}>
          <Button
            sx={{
              background: 'var(--color-primary)',
              color: 'white',
            }}
            fullWidth
            onClick={() => console.log(post)} 
          >
            Xuất bản
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Uploaded Thumbnail"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <TextEditor
        mode="advanced"
        preview
        initialValue=""
        initialHeight="70vh"
        onChange={handleContentChange}
      />
    </Box>
  );
};

export default NewPost;
