import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import VideoUpload from './VideoUpload';
import QuizCreation from './Questions';

const contentTypes = [
  { name: 'Upload tài liệu video', resource_type: 'Video', Component: VideoUpload },
  { name: 'Upload tài liệu question', resource_type: 'Question', Component: QuizCreation },
];

const ChooseDocument = forwardRef(({ defaultValue }: any, ref) => {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const videoRef = useRef<any>(null);
  const quizRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (selectedContent?.resource_type === 'Video' && videoRef.current) {
        return videoRef.current.getData();
      }
      if (selectedContent?.resource_type === 'Question' && quizRef.current) {
        return quizRef.current.getData();
      }
      return null;
    },
  }));

  useEffect(() => {
    if (defaultValue?.resource_type) {
      const content = contentTypes.find((c) => c.resource_type === defaultValue.resource_type);
      setSelectedContent(content);
    }
  }, [defaultValue]);

  const handleContentChange = (event: any) => {
    const content = contentTypes.find((c) => c.resource_type === event.target.value);
    setSelectedContent(content);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">Chọn loại nội dung</Typography>
            <FormControl fullWidth>
              <InputLabel>Loại nội dung</InputLabel>
              <Select value={selectedContent?.resource_type || ''} onChange={handleContentChange}>
                {contentTypes.map((item) => (
                  <MenuItem key={item.name} value={item.resource_type}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
          {selectedContent && (
            <selectedContent.Component
              ref={selectedContent.resource_type === 'Video' ? videoRef : quizRef}
              defaultValue={defaultValue}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
});

export default ChooseDocument;
