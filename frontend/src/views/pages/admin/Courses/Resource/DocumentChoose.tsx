import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, FormControl, Select, MenuItem } from '@mui/material';
import VideoUpload from './VideoUpload';
import QuizCreation from './Questions';

import QuizIcon from '@mui/icons-material/Quiz';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

// import CodeIcon from '@mui/icons-material/Code';
// import CreateCodePractice from './CreateCodePractice';
const contentTypes = [
  { name: 'Upload video', resource_type: 'Video', Component: VideoUpload, icon: PlayCircleIcon },
  { name: 'Upload question', resource_type: 'Question', Component: QuizCreation, icon: QuizIcon },
  {
    name: 'Upload tài liệu',
    resource_type: 'Document',
    Component: forwardRef(({ defaultValue }: { defaultValue: any }, ref) => {
      const getData = () => ({ _id: defaultValue._id, resource_type: 'Document', duration: 0 });
      useImperativeHandle(ref, () => ({
        getData,
      }));
      return <Typography>Bật sang tab mô tả để viết tài liệu</Typography>;
    }),

    icon: DescriptionIcon,
  },
  {
    name: 'Upload chứng chỉ',
    resource_type: 'Certificate',
    Component: forwardRef(({ defaultValue }: { defaultValue: any }, ref) => {
      const getData = () => ({ _id: defaultValue._id, resource_type: 'Certificate', duration: 0 });
      useImperativeHandle(ref, () => ({
        getData,
      }));
      return <Typography>Chứng chỉ sẽ được tạo tự động bên người dùng</Typography>;
    }),

    icon: CardMembershipIcon,
  },
];

const ChooseDocument = forwardRef(({ defaultValue }: any, ref) => {
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const documentRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return { ...documentRef.current.getData(), isActive: defaultValue?.isActive };
    },
  }));

  useEffect(() => {
    if (defaultValue?.resource_type) {
      const content = contentTypes.find((c) => c.resource_type === defaultValue.resource_type);
      setSelectedContent(content);
    } else {
      setSelectedContent(contentTypes[0]);
    }
  }, [defaultValue]);

  const handleContentChange = (event: any) => {
    const content = contentTypes.find((c) => c.resource_type === event.target.value);
    setSelectedContent(content);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5" mb={2}>
              Chọn loại nội dung
            </Typography>
            <FormControl fullWidth>
              <Select value={selectedContent?.resource_type || ''} onChange={handleContentChange}>
                {contentTypes.map((item) => (
                  <MenuItem key={item.name} value={item.resource_type}>
                    <item.icon sx={{ mr: 1 }} />
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
          {selectedContent && <selectedContent.Component ref={documentRef} defaultValue={defaultValue} />}
        </Grid>
      </Grid>
    </Box>
  );
});

export default ChooseDocument;
