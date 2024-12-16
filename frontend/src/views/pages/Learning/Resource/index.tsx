import { useState, useCallback, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';

import ArtPlayerComponent from '@/components/ArtplayComponent';
import Question from './Question';
// redux

// ui
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material';

// api
import { completeResource } from '@/api/progess';
import { createNote } from '@/api/noteApi';

const BoxHeaderAndNote = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

//  icon

// my pj
import formatLastUpdated from '@/utils/formatLastUpdated';
import Wrapper from '@/components/Wrapper';
import TextEditor from '@/components/TextEditor';
import { RootState } from '@/store/reducer';

import formatTime from '@/utils/formatTime';
import Certificate from './Cetificate/Cetificate';
import { getSingleCourseById } from '@/api/courseApi';
import { useParams } from 'react-router-dom';

const Resource: React.FC<any> = ({ resource, refetchResource, refetchNote }) => {
  const { id } = useParams();

  const user = useSelector((state: RootState) => state.authReducer.user);
  const [isVisibleNote, setIsVisibleNote] = useState<boolean>(false);

  const [note, setNote] = useState('');
  const [currentTime, setCurrentTime] = useState<number>(0);

  const artPlayer = useRef<any>();

  const theme = useTheme();

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['singleCourseById'],
    queryFn: () => getSingleCourseById(id || ''),
  });

  const mutationNote = useMutation({
    mutationKey: ['note'],
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Thêm mới ghi chú thành công');
      setIsVisibleNote(false);
      refetchNote();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleOpenNote = () => {
    setIsVisibleNote(true);

    artPlayer.current.pause();
  };

  const closeNote = () => {
    setIsVisibleNote(false);
    artPlayer.current.play();
  };

  const saveNote = () => {
    const payload = {
      title: resource.title,
      content: note,
      resource_id: resource._id,
      user_id: user._id,
      markAt: currentTime,
    };
    console.log(payload);
    mutationNote.mutate(payload);
  };

  const handleCompletedResource = useCallback(async () => {
    console.log(resource._id);

    try {
      const res = await completeResource(user._id, resource._id);

      if (res && res.status === 200) {
        console.log('Resource completed successfully');
      } else {
        console.error('Failed to complete resource');
      }
    } catch (error) {
      console.error('Error completing resource:', error);
    } finally {
      refetchResource();
    }
  }, [resource._id, user._id]);

  const handleUpdateTime = useCallback(
    (time: number) => {
      setCurrentTime(time);
    },
    [resource._id, user._id]
  );

  const isXs = useMediaQuery('(max-width:600px)');

  return (
    <>
      {(() => {
        switch (resource.resource_type) {
          case 'Video':
            return (
              <ArtPlayerComponent
                key={resource._id}
                ref={artPlayer}
                finished={resource.progress.is_completed}
                poster={resource?.thumbnail}
                videoUrl={resource.url}
                onCompleted={handleCompletedResource}
                onTimeUpdate={handleUpdateTime}
              />
            );

          case 'Question':
            return <Question questions={resource.questions} onCompleted={handleCompletedResource} />;

          case 'Document':
            setTimeout(handleCompletedResource, 3000);

            return (
              <Typography mt={2} fontSize={20} textAlign={'center'}>
                Tài liệu
              </Typography>
            );
          case 'Certificate':
            if (!resource.progress.is_completed) {
              handleCompletedResource();
            }
            return (
              <Certificate
                user_id={user._id}
                course_id={id}
                description={!isLoadingCourse && course.title}
                name={user.name}
              />
            );
        }
      })()}
      <Box
        sx={{
          marginTop: '20px',
          minHeight: '300px',
          padding: resource.resource_type === 'Document' && !isXs ? `0 150px` : '0 20px',

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

          {resource.resource_type == 'Video' && (
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
                      initialHeight="250px"
                      initialValue=""
                      onChange={setNote}
                    />
                    <Box mt={2} display={'flex'} justifyContent={'space-between'}>
                      <Button variant="outlined" onClick={closeNote}>
                        Đóng
                      </Button>

                      <Button variant="contained" onClick={saveNote}>
                        Lưu ghi chú
                      </Button>
                    </Box>
                  </Wrapper>
                )}
              >
                <Button
                  onClick={handleOpenNote}
                  sx={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper2,
                    padding: '10px 30px',
                    borderRadius: '10px',
                  }}
                >
                  Thêm ghi chú tại {formatTime(currentTime)}
                </Button>
              </HeadlessTippy>
            </Box>
          )}
        </BoxHeaderAndNote>

        <Typography mt={1} dangerouslySetInnerHTML={{ __html: resource.description }} />
      </Box>
      <ToastContainer />
    </>
  );
};
export default Resource;
