import { useEffect, useRef } from 'react';
import ArtPlayer from 'artplayer';
import Hls from 'hls.js';
import { Box } from '@mui/material';

interface ArtPlayerComponentProps {
  videoUrl: string;
  poster?: string;
  onCompleted?: () => void;
}

const ArtPlayerComponent: React.FC<ArtPlayerComponentProps> = ({ videoUrl, poster, onCompleted }) => {
  const artPlayerRef = useRef<HTMLDivElement>(null);
  const art = useRef<ArtPlayer | null>(null);

  const lastTimeRef = useRef(0); // Lưu thời gian hiện tại trước khi tua
  const totalSeekTime = useRef(0); // Tổng thời gian đã tua
  const isSeekingRef = useRef(false);
  const isCompleted = useRef(false);

  useEffect(() => {
    if (artPlayerRef.current) {
      const hls = new Hls();
      hls.loadSource(videoUrl);

      art.current = new ArtPlayer({
        pip: true,
        setting: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        subtitleOffset: true,
        miniProgressBar: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        airplay: true,
        theme: '#23ade5',
        lang: navigator.language.toLowerCase(),
        moreVideoAttr: {
          crossOrigin: 'anonymous',
        },

        poster: poster || '',
        container: artPlayerRef.current,
        url: videoUrl,
        customType: {
          m3u8: function (video) {
            hls.attachMedia(video);
          },
        },
      });

      // Lắng nghe sự kiện "seek"
      art?.current?.on('seek', (currentSeek) => {
        const previousTime = lastTimeRef.current; // Thời gian trước khi tua

        if (isSeekingRef.current) {
          return; // Nếu đang trong quá trình seek, không xử lý sự kiện này
        }

        isSeekingRef.current = true; // Đánh dấu đang thực hiện seek

        if (currentSeek < previousTime) {
          // Người dùng tua ngược => Reset tổng thời gian tua
          if (previousTime - currentSeek < 0) {
            totalSeekTime.current = 0;
          }
          console.log('Người dùng tua ngược, reset tổng thời gian tua');
          totalSeekTime.current -= previousTime - currentSeek;
        } else {
          // Người dùng tua tiến => Tính thời gian tua
          const seekDiff = currentSeek - previousTime;
          totalSeekTime.current += seekDiff;
          console.log('Người dùng đã tua:', seekDiff, 'giây');
        }

        console.log('Tổng thời gian tua hiện tại:', totalSeekTime.current, 'giây');

        if (art.current?.duration && totalSeekTime.current >= art.current.duration / 2) {
          alert('Bạn học quá nhanh');

          // Tua lại về thời gian ban đầu (0 giây)
          art.current.seek = lastTimeRef.current;
          totalSeekTime.current -= totalSeekTime.current;
        }

        // Cập nhật lastTimeRef với vị trí mới
        lastTimeRef.current = currentSeek;
        isSeekingRef.current = false;
      });

      // Lắng nghe sự kiện "timeupdate"
      art?.current?.on('video:timeupdate', () => {
        lastTimeRef.current = art.current?.currentTime || 0; // Cập nhật lastTimeRef khi video đang chạy
        if (!art?.current?.currentTime) {
          return;
        }
        if (art?.current?.currentTime >= art.current?.duration / 2 && onCompleted && !isCompleted.current) {
          onCompleted();
          isCompleted.current = true;
        }
      });

      return () => {
        if (art.current) {
          art.current.destroy();
          art.current = null;
          lastTimeRef.current = 0;
          totalSeekTime.current = 0;
          isSeekingRef.current = false;
          isCompleted.current = false;
        }
        hls.destroy();
      };
    }
  }, [videoUrl]);

  return (
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
  );
};

export default ArtPlayerComponent;
