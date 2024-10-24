import { Box, useTheme, Grid, Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useState, useRef, useEffect } from 'react';
import TabsCustom from '@/components/TabsCustom';

interface CardCourseProps {
  labels: React.ReactNode[];
  widthIconImage?: string;
  contents: React.ComponentType<any>[];
  onSubmit?: (data: { title: string; thumbnail: File | null }) => void;
}

const CardCourse: React.FC<CardCourseProps> = ({
  labels,
  contents,
  widthIconImage,
  onSubmit,
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const contentRefs = useRef<(React.RefObject<any> | null)[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    console.log(file);
    setThumbnail(file);
  };

  const handleCreate = () => {
    const contentsData = contentRefs.current.reduce((acc, ref) => {
      if (ref && ref.current && typeof ref.current.getData === 'function') {
        acc = { ...acc, ...ref.current.getData() };
      } else {
        console.warn('Content component is missing getData method', ref);
        acc = { ...acc };
      }
      return acc;
    }, {});

    if (onSubmit) {
      onSubmit({ title, thumbnail, ...contentsData });
    }
  };

  // Initialize refs when contents change or component mounts
  useEffect(() => {
    contentRefs.current = contents.map(
      (_, index) => contentRefs.current[index] || React.createRef()
    );
  }, [contents]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: 4,
      }}
    >
      <Grid
        mb={4}
        container
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        sx={{
          boxShadow: 'var(--main-box-shadow)',
          borderRadius: '4px',
        }}
      >
        <Grid item lg={10}>
          <input
            placeholder="Nhập tiêu đề nội dung"
            onChange={handleTitleChange}
            style={{
              border: 'none',
              borderBottom: `1px solid ${theme.palette.divider}`,
              fontSize: '20px',
              width: '100%',
              paddingBottom: '10px',
              outline: 'none',
            }}
          />
        </Grid>
        <Grid
          item
          lg={1.5}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          boxShadow="var(--main-box-shadow)"
        >
          <input
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="upload-image"
          />
          <label htmlFor="upload-image">
            <AddAPhotoIcon
              sx={{
                fontSize: {
                  sm: '30px',
                  md: widthIconImage ?? '100px',
                },
                opacity: 0.4,
              }}
            />
          </label>
        </Grid>
      </Grid>

      {/* content */}
      <TabsCustom
        labels={labels}
        contents={contents.map((Content, index) => (
          <Content key={index} ref={contentRefs.current[index]} />
        ))}
      />

      <Button sx={{ mt: 2 }} onClick={handleCreate}>
        Tạo
      </Button>
    </Box>
  );
};

export default CardCourse;
