import { Box, BoxProps, Grid, Typography, styled, useTheme } from '@mui/material';
import React from 'react';

const Thumbnail = styled('img')(() => ({
  width: '100px',
  objectFit: 'cover',
}));

interface ImageDescriptionProps extends BoxProps {
  thumbnail?: string;
  bodyHead?: string | React.ReactNode;
  bodyContent?: string | React.ReactNode;
  bExtend?: React.ReactNode;
  hover: boolean;
  isUnRead?: boolean;
}

const ImageDescription: React.FC<ImageDescriptionProps> = ({
  thumbnail,
  bodyHead,
  bodyContent,
  bExtend,
  isUnRead,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box {...rest}>
      <Grid
        container
        alignItems="center"
        sx={{
          padding: '5px 0',
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': {
            backgroundColor: theme.palette.background.paper2,
          },
        }}
      >
        <Grid item sx={{ marginRight: '10px' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: `${isUnRead && 'red'}` }} />

            <Thumbnail sx={{ width: 120, borderRadius: 'var(--mini-border-radius)' }} src={thumbnail} alt="img" />
          </Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" sx={{ fontSize: 'var(--main-font-size)' }}>
            {bodyHead}
          </Typography>
          <Typography variant="body1">{bodyContent}</Typography>
          {bExtend}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageDescription;
