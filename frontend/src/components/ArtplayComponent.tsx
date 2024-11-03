import { useEffect, useRef } from 'react';
import ArtPlayer from 'artplayer';
import Hls from 'hls.js';
import { Box } from '@mui/material';

interface ArtPlayerComponentProps {
  videoUrl: string;
  poster?: string;
}

const ArtPlayerComponent: React.FC<ArtPlayerComponentProps> = ({ videoUrl, poster }) => {
  const artPlayerRef = useRef<HTMLDivElement>(null);
  const art = useRef<ArtPlayer | null>(null);

  useEffect(() => {
    if (artPlayerRef.current) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
       console.log(hls);
       
      art.current = new ArtPlayer({
        poster: poster || '',
        container: artPlayerRef.current,
        url: videoUrl,
        customType: {
          m3u8: function (video) {
            hls.attachMedia(video);
          },
        },
        controls: [
          {
            position: 'right',
            html: 'Fullscreen',
            click: function () {
              if (art.current) {
                art.current.fullscreen = !art.current.fullscreen;
              }
            },
          },
          // {
          //   position: 'right',
          //   html: 'Thu nhỏ',
          //   click: function () {
          //     if (art.current) art.current.pip = !art.current.pip;
          //   },
          // },
        ],
      });

      return () => {
        if (art.current) {
          art.current.destroy();
          art.current = null;
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
          xs: '270px',
          sm: '400px',
          md: '520px',
        },
      }}
      ref={artPlayerRef}
    />
  );
};

export default ArtPlayerComponent;
