import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';

import ArtPlayerComponent from '@/components/ArtplayComponent';
import Question from '../Question';
import { Box, Typography, Button } from '@mui/material';
import { useTheme, styled } from '@mui/material';

// api
import { completeResource } from '@/api/progess';
const BoxHeaderAndNote = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

//  icon

import formatLastUpdated from '@/utils/formatLastUpdated';
import Wrapper from '@/components/Wrapper';
import TextEditor from '@/components/TextEditor';
import { RootState } from '@/store/reducer';
const Resource: React.FC<any> = ({ resource, refetchResource }) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const [isVisibleNote, setIsVisibleNote] = useState<boolean>(false);

  const theme = useTheme();

  const handleToggleNote = () => {
    setIsVisibleNote(!isVisibleNote);
  };

  const handleCompletedResource = async () => {
    console.log(resource.progress.is_completed);

    if (!resource.progress.is_completed) {
      console.log(resource._id);

      try {
        const res = await completeResource(user._id, resource._id);

        if (res && res.status === 200) {
          console.log('Resource completed successfully');
        } else {
          console.error('Failed to complete resource:');
        }
      } catch (error) {
        console.error('Error completing resource:');
      } finally {
        refetchResource();
      }
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
          marginTop: '20px',

          padding: '0 20px',
          background: theme.palette.background.paper,
        }}
      >
        <BoxHeaderAndNote>
          <Box>
            <Typography variant="h2" fontWeight={500}>
              {resource.title}
            </Typography>
            <Box my={2}>
              <Typography variant="caption">{formatLastUpdated(resource.updatedAt)}</Typography>
            </Box>
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

        <Typography mt={1} dangerouslySetInnerHTML={{ __html: resource.description }} />
      </Box>
    </>
  );
};
export default Resource;
