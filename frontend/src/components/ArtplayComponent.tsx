import { useEffect, useRef } from 'react';
import ArtPlayer from 'artplayer';
import Hls from 'hls.js';
import { Box } from '@mui/material';
interface ArtPlayerComponentProps {
  videoUrl: string;
}

const ArtPlayerComponent: React.FC<ArtPlayerComponentProps> = ({
  videoUrl,
}) => {
  const artPlayerRef = useRef<HTMLDivElement>(null);
  const artPlayerInstance = useRef<ArtPlayer | null>(null);

  useEffect(() => {
    if (artPlayerRef.current) {
      const hls = new Hls();
      hls.loadSource(videoUrl);

      artPlayerInstance.current = new ArtPlayer({
        container: artPlayerRef.current,
        url: hls.url,
        customType: {
          m3u8: function (video) {
            hls.attachMedia(video);
          },
        },
        controls: [],
      });

      return () => {
        if (artPlayerInstance.current) {
          artPlayerInstance.current.destroy();
          artPlayerInstance.current = null;
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
