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
  fileName: string;
  file: File | null;
  resource_type: string;
  question: [];
  duration: number;
}
// Tạo theme tùy chỉnh
const chooseDocument: React.FC = forwardRef((_, ref) => {
  const [selectedContent, setSelectedContent] = useState('');
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [formData, setFormData] = useState<Resourse>({
    fileName: '',
    file: null,
    resource_type: '',
    question: [],
    duration: 0,
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
              setFormData((pre: Resourse) => ({ ...pre, duration: Math.floor(durationInSeconds), fileName:file.name }));
            
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

  console.log(videoSrc);

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
      {videoSrc && <video controls src={videoSrc}></video>}
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

// import { useState, forwardRef, useImperativeHandle } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   SelectChangeEvent,
// } from '@mui/material';
// import { Description, Image, VideoLibrary, Quiz, CloudUpload } from '@mui/icons-material';
// import { useForm, Controller } from 'react-hook-form';

// // Create custom theme
// const ChooseDocument: React.FC = forwardRef((_, ref) => {
//   const [selectedContent, setSelectedContent] = useState('');

//   // Set default values for the form
//   const { control, handleSubmit, getValues, setValue } = useForm({
//     defaultValues: {
//       file: null,
//       resource_type: 'video',
//       questions: [],
//       duration: 1000,
//     },
//   });

//   const getData = () => {
//     return {
//       resource_type: getValues('resource_type'),
//       questions: getValues('questions'),
//       duration: getValues('duration'),
//       file: getValues('file'),
//     };
//   };

//   useImperativeHandle(ref, () => ({
//     getData,
//   }));

//   const contentTypes = [
//     {
//       name: 'Tài liệu',
//       icon: <Description />,
//       addComponent: <DocumentUpload control={control} setValue={setValue} />,
//     },
//     { name: 'Ảnh', icon: <Image />, addComponent: <ImageUpload control={control} setValue={setValue} /> },
//     { name: 'Video', icon: <VideoLibrary />, addComponent: <VideoUpload control={control} setValue={setValue} /> },
//     { name: 'Quiz', icon: <Quiz />, addComponent: <QuizCreation control={control} /> },
//   ];

//   const handleContentChange = (event: SelectChangeEvent<string>) => {
//     const value = event.target.value;
//     setValue('resource_type', value);
//     setSelectedContent(value);
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={12}>
//           <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Chọn nội dung
//             </Typography>
//             <FormControl fullWidth>
//               <InputLabel id="content-select-label">Loại nội dung</InputLabel>
//               <Select
//                 labelId="content-select-label"
//                 id="content-select"
//                 value={selectedContent}
//                 label="Loại nội dung"
//                 onChange={handleContentChange}
//               >
//                 {contentTypes.map((item) => (
//                   <MenuItem key={item.name} value={item.name}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       {item.icon}
//                       <Typography sx={{ ml: 1 }}>{item.name}</Typography>
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Paper>
//           {selectedContent && (
//             <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Thêm {selectedContent}
//               </Typography>
//               {contentTypes.find((type) => type.name === selectedContent)?.addComponent}
//             </Paper>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// });

// // Component để tải tài liệu
// function DocumentUpload({ control, setValue }: { control: any; setValue: (name: string, value: any) => void }) {
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setValue('file', file);
//     }
//   };

//   return (
//     <Box>
//       <Button component="label" startIcon={<CloudUpload />}>
//         Tải lên tài liệu
//         <input type="file" hidden onChange={handleFileChange} />
//       </Button>
//     </Box>
//   );
// }

// // Component để tải ảnh
// function ImageUpload({ control, setValue }: { control: any; setValue: (name: string, value: any) => void }) {
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setValue('file', file);
//     }
//   };

//   return (
//     <Box>
//       <Button component="label" startIcon={<CloudUpload />}>
//         Tải lên ảnh
//         <input type="file" accept="image/*" hidden onChange={handleFileChange} />
//       </Button>
//     </Box>
//   );
// }

// // Component để tải video
// function VideoUpload({ control, setValue }: { control: any; setValue: (name: string, value: any) => void }) {
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setValue('file', file);
//     }
//   };

//   return (
//     <Box>
//       <Button component="label" startIcon={<CloudUpload />}>
//         Tải lên video
//         <input type="file" accept="video/*" hidden onChange={handleFileChange} />
//       </Button>
//     </Box>
//   );
// }

// // Component để tạo quiz
// function QuizCreation({ control }: { control: any }) {
//   return (
//     <Box>
//       <Controller
//         name="question"
//         control={control}
//         render={({ field }) => <TextField {...field} fullWidth label="Câu hỏi" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="optionA"
//         control={control}
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án A" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="optionB"
//         control={control}
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án B" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="optionC"
//         control={control}
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án C" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="optionD"
//         control={control}
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án D" variant="outlined" margin="normal" />}
//       />
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Đáp án đúng</InputLabel>
//         <Controller
//           name="correctAnswer"
//           control={control}
//           render={({ field }) => (
//             <Select {...field}>
//               <MenuItem value="A">A</MenuItem>
//               <MenuItem value="B">B</MenuItem>
//               <MenuItem value="C">C</MenuItem>
//               <MenuItem value="D">D</MenuItem>
//             </Select>
//           )}
//         />
//       </FormControl>
//     </Box>
//   );
// }

// export default ChooseDocument;
