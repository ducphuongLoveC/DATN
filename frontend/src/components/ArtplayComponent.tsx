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
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: white;transform: ;msFilter:;"><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg>',
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
