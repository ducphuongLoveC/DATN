import { useEffect, useRef, useState } from 'react';
import ArtPlayer from 'artplayer';
import Hls from 'hls.js';
import { Box, Modal, Typography, Button } from '@mui/material';

interface ArtPlayerComponentProps {
  videoUrl: string;
  poster?: string;
}

const ArtPlayerComponent: React.FC<ArtPlayerComponentProps> = ({ videoUrl, poster }) => {
  const artPlayerRef = useRef<HTMLDivElement>(null);
  const art = useRef<ArtPlayer | null>(null);
  const [seekingTime, setSeekingTime] = useState<number>(0);
  const maxSkipDuration = 0.1;
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (artPlayerRef.current) {
      const hls = new Hls();
      hls.loadSource(videoUrl);

      art.current = new ArtPlayer({
        poster: poster || '',
        container: artPlayerRef.current,
        url: videoUrl,
        customType: {
          m3u8: function (video) {
            hls.attachMedia(video);
          },
        },
      });

      const videoElement = art.current?.video;
      if (videoElement) {
        videoElement.addEventListener('loadedmetadata', () => {
          setVideoDuration(videoElement.duration);
          setIsVideoLoaded(true);
        });

        videoElement.addEventListener('seeking', () => {
          if (isVideoLoaded) {
            setIsSeeking(true);
            setSeekingTime(videoElement.currentTime || 0);
            setIsAlertShown(false);
          }
        });

        videoElement.addEventListener('seeked', () => {
          setIsSeeking(false);
          const currentTime = videoElement.currentTime;
          const skipDuration = Math.abs(currentTime - seekingTime);

          // Chỉ quay lại khi tua vượt quá giới hạn
          if (isVideoLoaded && skipDuration > videoDuration * maxSkipDuration) {
            if (!isAlertShown) {
              setShowWarningModal(true);
              videoElement.currentTime = seekingTime;
              setIsAlertShown(true);
            }
          }
        });
      }

      return () => {
        if (art.current) {
          art.current.destroy();
          art.current = null;
        }
        hls.destroy();
      };
    }
  }, [videoUrl, seekingTime, videoDuration, isAlertShown, isVideoLoaded]);

  const handleCloseModal = () => {
    setShowWarningModal(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: {
            xs: '210px',
            sm: '300px',
            md: '520px',
          },
        }}
        ref={artPlayerRef}
      />
      <Modal open={showWarningModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" component="h2">
            Cảnh báo
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Bạn đang học nhanh hơn bình thường, vui lòng không tua quá nhiều khi học!!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleCloseModal}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ArtPlayerComponent;