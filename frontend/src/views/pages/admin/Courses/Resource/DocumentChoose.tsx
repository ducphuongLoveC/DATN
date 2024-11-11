import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Description, Image, VideoLibrary, Quiz, CloudUpload } from '@mui/icons-material';

interface Resourse {
  _id?: string;
  fileName: string;
  file: File | null;
  resource_type: string;
  question: [];
  duration: number;
  url: string;
}
// Tạo theme tùy chỉnh
const chooseDocument: React.FC = forwardRef(({ defaultValue }: any, ref) => {
  const [selectedContent, setSelectedContent] = useState('');
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [formData, setFormData] = useState<Resourse>({
    _id: defaultValue._id || '',
    fileName: '',
    file: null,
    resource_type: '',
    question: [],
    duration: defaultValue.duration || '',
    url: defaultValue.url || '',
  });

  const getData = () => {
    return formData;
  };
  useImperativeHandle(ref, () => ({
    getData,
  }));

  const handleContentChange = (event: any) => {
    setSelectedContent(event.target.value);
    setFormData((pre: Resourse) => ({ ...pre, resource_type: event.target.value }));
  };

  console.log(formData);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFormData((pre: Resourse) => ({ ...pre, file: file }));
      switch (file.type) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          console.log('Selected image file:', file);
          break;

        case 'video/mp4':
        case 'video/webm':
        case 'video/ogg':
          console.log('Selected video file:', file);
          const reader = new FileReader();

          reader.onload = () => {
            const videoElement = document.createElement('video');
            videoElement.src = reader.result as string;

            videoElement.onloadedmetadata = () => {
              const durationInSeconds = videoElement.duration;
              setFormData((pre: Resourse) => ({
                ...pre,
                duration: Math.floor(durationInSeconds),
                fileName: file.name,
              }));

              setVideoSrc(videoElement.src);
              console.log('Video duration in seconds:', durationInSeconds);
            };
          };

          reader.readAsDataURL(file);
          break;

        default:
          console.log('Unsupported file type:', file.type);
          break;
      }
    }
  };

  const contentTypes = [
    {
      name: 'Tài liệu',
      icon: <Description />,
      addComponent: <DocumentUpload />,
    },
    { name: 'Ảnh', icon: <Image />, addComponent: <ImageUpload handleFile={handleFile} /> },
    { name: 'Video', icon: <VideoLibrary />, addComponent: <VideoUpload handleFile={handleFile} /> },
    { name: 'Quiz', icon: <Quiz />, addComponent: <QuizCreation /> },
  ];

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
              {contentTypes.find((type) => type.name === selectedContent)?.addComponent}
            </Paper>
          )}
        </Grid>
      </Grid>
      {videoSrc ? <video controls src={videoSrc}></video> : formData.url && <video controls src={formData.url} />}
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

interface ImageUploadProps {
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleFile }) => {
  return (
    <Box>
      <Button component="label" startIcon={<CloudUpload />}>
        Tải lên ảnh
        <input type="file" accept="image/*" hidden onChange={handleFile} />
      </Button>
    </Box>
  );
};

interface VideoUploadProps {
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ handleFile }) => {
  return (
    <Box>
      <Button component="label" startIcon={<CloudUpload />}>
        Tải lên video
        <input type="file" accept="video/*" hidden onChange={handleFile} />
      </Button>
    </Box>
  );
};

function QuizCreation() {
  return (
    <Box>
      <TextField fullWidth label="Câu hỏi" variant="outlined" margin="normal" />
      <TextField fullWidth label="Đáp án A" variant="outlined" margin="normal" />
      <TextField fullWidth label="Đáp án B" variant="outlined" margin="normal" />
      <TextField fullWidth label="Đáp án C" variant="outlined" margin="normal" />
      <TextField fullWidth label="Đáp án D" variant="outlined" margin="normal" />
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
