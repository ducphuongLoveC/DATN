import { Grid, Typography, styled, useTheme } from '@mui/material';
import React from 'react';

const Thumbnail = styled('img')(() => ({
  width: '70px',
  objectFit: 'contain',
}));

interface ImageDescriptionProps {
  thumbnail?: string;
  bodyHead?: string;
  bodyContent?: string | React.ReactNode;
  bExtend?: React.ReactNode;
  hover: boolean;
}

const ImageDescription: React.FC<ImageDescriptionProps> = ({
  thumbnail,
  bodyHead,
  bodyContent,
  bExtend,
}) => {
  const theme = useTheme();

  return (
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
        <Thumbnail
          sx={{ width: 120, borderRadius: 'var(--mini-border-radius)' }}
          src={thumbnail}
          alt="img"
        />
      </Grid>
      <Grid item xs>
        <Typography variant="h6" sx={{ fontSize: 'var(--main-font-size)' }}>
          {bodyHead}
        </Typography>
        <Typography variant="body1">{bodyContent}</Typography>
        {bExtend}
      </Grid>
    </Grid>
  );
};

export default ImageDescription;
