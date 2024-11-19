import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';

import ArtPlayerComponent from '@/components/ArtplayComponent';
import Question from '../Question';
import { Box, Typography, Button } from '@mui/material';
import { useTheme, styled } from '@mui/material';

// api
import { completeResource } from '@/api/progess';
const BoxHeaderAndNote = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
}));
import formatLastUpdated from '@/utils/formatLastUpdated';
import Wrapper from '@/components/Wrapper';
import TextEditor from '@/components/TextEditor';
import { RootState } from '@/store/reducer';
const Resource: React.FC<any> = ({ resource, refetchResource }) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const [isVisibleNote, setIsVisibleNote] = useState<boolean>(false);

  console.log(resource);

  console.log(refetchResource);

  const theme = useTheme();

  const handleToggleNote = () => {
    setIsVisibleNote(!isVisibleNote);
  };

  const handleCompletedResource = async () => {
    console.log(resource.progress.is_completed);

    if (!resource.progress.is_completed) {
      console.log(resource._id);

      const res = await completeResource(user._id, resource._id);
      console.log(res);
      refetchResource();
    }
  };
  return (
    <>
      {(() => {
        switch (resource.resource_type) {
          case 'Video':
            return <ArtPlayerComponent videoUrl={resource.url} onCompleted={handleCompletedResource} />;

          case 'Question':
            return <Question questions={resource.questions} onCompleted={handleCompletedResource} />;
        }
      })()}
      <Box
        sx={{
          marginTop: '10px',
          padding: {
            sm: '0',
            md: '20px',
          },
          background: theme.palette.background.paper,
        }}
      >
        <BoxHeaderAndNote>
          <Box>
            <Typography variant="h1" fontWeight={500}>
              {resource.title}
            </Typography>
            <Typography variant="caption">{formatLastUpdated(resource.updatedAt)}</Typography>
          </Box>
          <Box>
            <HeadlessTippy
              zIndex={999}
              visible={isVisibleNote}
              placement="bottom-end"
              allowHTML
              interactive
              render={(attrs) => (
                <Wrapper {...attrs} style={{ width: '500px' }}>
                  <TextEditor
                    key={isVisibleNote ? 'visible' : 'hidden'}
                    initialHeight="150px"
                    initialValue=""
                    onChange={(content) => {
                      console.log(content);
                    }}
                  />
                  <Button onClick={handleToggleNote}>Lưu ghi chú</Button>
                </Wrapper>
              )}
            >
              <Button
                onClick={handleToggleNote}
                sx={{
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper2,
                  padding: '10px 30px',
                  borderRadius: '10px',
                }}
              >
                Thêm ghi chú tại 0:00
              </Button>
            </HeadlessTippy>
          </Box>
        </BoxHeaderAndNote>
        <Typography
          variant="body1"
          sx={{
            marginTop: '20px',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Typography dangerouslySetInnerHTML={{ __html: resource.description }} />
        </Typography>
      </Box>
    </>
  );
};
export default Resource;
