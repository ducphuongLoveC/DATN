import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Switch,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Description,
  Image,
  VideoLibrary,
  Quiz,
  Build,
  Visibility,
  AccessTime,
  CloudUpload,
} from '@mui/icons-material';

// Tạo theme tùy chỉnh
const chooseDocument: React.FC = forwardRef((_, ref) => {
  const [selectedContent, setSelectedContent] = useState('');
  const [allowPreview, setAllowPreview] = useState(false);
  const [publicViews, setPublicViews] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const getData = () => {
    return {
      resource_type: 'video',
      url: 'video1.test',
      questions: [],
      duration: 1000
    };
  };
  useImperativeHandle(ref, () => ({
    getData,
  }));

  const contentTypes = [
    {
      name: 'Tài liệu',
      icon: <Description />,
      addComponent: <DocumentUpload />,
    },
    { name: 'Ảnh', icon: <Image />, addComponent: <ImageUpload /> },
    { name: 'Video', icon: <VideoLibrary />, addComponent: <VideoUpload /> },
    { name: 'Quiz', icon: <Quiz />, addComponent: <QuizCreation /> },
  ];

  const handleContentChange = (event: any) => {
    setSelectedContent(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Chọn nội dung
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="content-select-label">Loại nội dung</InputLabel>
              <Select
                labelId="content-select-label"
                id="content-select"
                value={selectedContent}
                label="Loại nội dung"
                onChange={handleContentChange}
              >
                {contentTypes.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                      <Typography sx={{ ml: 1 }}>{item.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
          {selectedContent && (
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Thêm {selectedContent}
              </Typography>
              {
                contentTypes.find((type) => type.name === selectedContent)
                  ?.addComponent
              }
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
});

function DocumentUpload() {
  return (
    <Box>
      <Button component="label" startIcon={<CloudUpload />}>
        Tải lên tài liệu
        <input type="file" hidden />
      </Button>
    </Box>
  );
}

function ImageUpload() {
  return (
    <Box>
      <Button component="label" startIcon={<CloudUpload />}>
        Tải lên ảnh
        <input type="file" accept="image/*" hidden />
      </Button>
    </Box>
  );
}

function VideoUpload() {
  return (
    <Box>
      <Button component="label" startIcon={<CloudUpload />}>
        Tải lên video
        <input type="file" accept="video/*" hidden />
      </Button>
    </Box>
  );
}

function QuizCreation() {
  return (
    <Box>
      <TextField fullWidth label="Câu hỏi" variant="outlined" margin="normal" />
      <TextField
        fullWidth
        label="Đáp án A"
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Đáp án B"
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Đáp án C"
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Đáp án D"
        variant="outlined"
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Đáp án đúng</InputLabel>
        <Select>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}



export default chooseDocument;
