import { useEffect, useRef, memo, useImperativeHandle, forwardRef } from 'react';
import ArtPlayer from 'artplayer';
import Hls from 'hls.js';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';
import { SET_IS_FIRST_PLAYING_VIDEO } from '@/store/actions';

interface ArtPlayerComponentProps {
  finished: boolean;
  videoUrl: string;
  poster?: string;
  onCompleted?: () => void;
  onTimeUpdate: (duration: number) => void;
}

const ArtPlayerComponent = forwardRef(
  ({ finished, videoUrl, poster, onCompleted, onTimeUpdate }: ArtPlayerComponentProps, ref) => {
    const seek = useSelector((state: RootState) => state.homeReducer.seek);
    const isFirstPlaying = useSelector((state: RootState) => state.homeReducer.isFirstPlayingVideo);

    const artPlayerRef = useRef<HTMLDivElement>(null);
    const art = useRef<ArtPlayer | null>(null);

    const dispatch = useDispatch();

    const lastTimeRef = useRef(0);
    const totalSeekTime = useRef(0);
    const isSeekingRef = useRef(false);
    const isCompleted = useRef(false);
    const isFirstDispatch = useRef(false);

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
            totalSeekTime.current -= previousTime - currentSeek;
          } else {
            // Người dùng tua tiến => Tính thời gian tua
            const seekDiff = currentSeek - previousTime;
            totalSeekTime.current += seekDiff;
          }

          if (!finished && art.current?.duration && totalSeekTime.current >= art.current.duration / 2) {
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
          if (!isCompleted.current && art?.current?.currentTime >= art.current?.duration / 2 && onCompleted) {
            onCompleted();
            isCompleted.current = true;
          }
          onTimeUpdate(art.current?.currentTime);
        });

        art?.current?.on('play', () => {
          if (!isFirstDispatch.current) {
            dispatch({ type: SET_IS_FIRST_PLAYING_VIDEO, payload: true });
            isFirstDispatch.current = true;
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
          // dispatch({ type: SET_IS_FIRST_PLAYING_VIDEO, payload: false });
          hls.destroy();
        };
      }
    }, [videoUrl]);

    useEffect(() => {
      if (art?.current) {
        if (isFirstPlaying) {
          art.current.play();
        }
      }
    }, [isFirstPlaying]);

    useEffect(() => {
      if (art.current && seek !== undefined) {
        art.current.seek = seek;
        art.current.play();
      }
    }, [seek]);

    useImperativeHandle(ref, () => ({
      play: () => art.current?.play(),
      pause: () => art.current?.pause(),
      seek: (time: number) => {
        if (art.current) {
          art.current.seek = time;
        }
      },
      getCurrentTime: () => art.current?.currentTime,
    }));

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
  }
);

export default memo(ArtPlayerComponent);
