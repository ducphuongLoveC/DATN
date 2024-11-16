import { useForm, Controller } from 'react-hook-form';
import { Box, useTheme, Grid, Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useState, useRef, useEffect } from 'react';
import TabsCustom from '@/components/TabsCustom';

interface CardCourseProps {
  labels: React.ReactNode[];
  contents: React.ComponentType<any>[];
  widthIconImage?: string;
  onSubmit?: (datas: { title: string; thumbnail: File | null } | any) => void;
  initialTitle?: string;
  initialThumbnail?: File | null;
  defaultValue?: any;
  isImage?: boolean;
}

interface CardFormProp {
  title: string;
  thumbnail: File | null;
}

const CardCourse: React.FC<CardCourseProps> = ({
  labels,
  contents,
  widthIconImage,
  onSubmit,
  defaultValue = {},
  isImage = true,
}) => {
  const theme = useTheme();

  const { control, handleSubmit } = useForm<CardFormProp>({
    defaultValues: {
      title: defaultValue.title || '',
      thumbnail: defaultValue.thumbnail || null,
    },
  });

  const [datas, setDatas] = useState(defaultValue);
  const contentRefs = useRef<(React.RefObject<any> | null)[]>(
    Array(contents.length)
      .fill(null)
      .map(() => React.createRef())
  );

  const getDatas = () => {
    const contentsData = contentRefs.current.reduce((acc, ref) => {
      if (ref && ref.current && typeof ref.current.getData === 'function') {
        acc = { ...acc, ...ref.current.getData() };
      } else {
        console.warn('Content component is missing getData method', ref);
        acc = { ...acc };
      }
      return acc;
    }, {});
    return contentsData;
  };

  const onSubmitForm = (data: CardFormProp) => {
    if (onSubmit) {
      onSubmit({ ...data, ...getDatas() });
    }
  };

  const handleCreateData = () => {
    setDatas(getDatas());
  };

  useEffect(() => {
    contentRefs.current = contents.map((_, index) => contentRefs.current[index] || React.createRef());
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
        <Grid item lg={isImage ? 10 : 12}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Nhập tiêu đề nội dung"
                style={{
                  border: 'none',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  fontSize: '20px',
                  width: '100%',
                  paddingBottom: '10px',
                  outline: 'none',
                }}
              />
            )}
          />
        </Grid>

        {isImage && (
          <Grid
            item
            lg={1.5}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            boxShadow="var(--main-box-shadow)"
          >
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                    style={{ display: 'none' }}
                    id="upload-image"
                  />
                  <label htmlFor="upload-image">
                    {field.value ? (
                      <img
                        src={typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value)}
                        alt="Thumbnail"
                        style={{
                          width: widthIconImage || '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <AddAPhotoIcon
                        sx={{
                          fontSize: {
                            sm: '30px',
                            md: widthIconImage ?? '100px',
                          },
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </label>
                </>
              )}
            />
          </Grid>
        )}
      </Grid>

      {/* content */}
      <TabsCustom
        onChange={handleCreateData}
        labels={labels}
        contents={contents.map((Content, index) => (
          <Content
            key={index}
            ref={contentRefs.current[index]}
            defaultValue={Object.keys(getDatas()).length > 0 ? getDatas() : datas}
          />
        ))}
      />

      <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSubmit(onSubmitForm)}>
        Lưu
      </Button>
    </Box>
  );
};

export default CardCourse;
