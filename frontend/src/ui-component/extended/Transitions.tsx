import React from 'react';
import {
  Box,
  Collapse,
  Fade,
  Grow,
  Slide,
  Zoom,
  CollapseProps,
  FadeProps,
  GrowProps,
  SlideProps,
  ZoomProps,
} from '@mui/material';

// Define types for props
interface TransitionsProps {
  children?: React.ReactNode;
  type?: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom';
  position?:
    | 'top-left'
    | 'top-right'
    | 'top'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom';
  direction?: 'up' | 'down' | 'left' | 'right';
  [key: string]: any; // Allows additional props like timeout, in, etc.
}

// ==============================|| TRANSITIONS ||============================== //

const Transitions: React.FC<TransitionsProps> = React.forwardRef(
  (
    {
      children,
      position = 'top-left',
      type = 'grow',
      direction = 'up',
      ...others
    },
    ref
  ) => {
    let positionSX: React.CSSProperties = {
      transformOrigin: '0 0 0',
    };

    switch (position) {
      case 'top-right':
        positionSX = {
          transformOrigin: 'top right',
        };
        break;
      case 'top':
        positionSX = {
          transformOrigin: 'top',
        };
        break;
      case 'bottom-left':
        positionSX = {
          transformOrigin: 'bottom left',
        };
        break;
      case 'bottom-right':
        positionSX = {
          transformOrigin: 'bottom right',
        };
        break;
      case 'bottom':
        positionSX = {
          transformOrigin: 'bottom',
        };
        break;
      case 'top-left':
      default:
        positionSX = {
          transformOrigin: '0 0 0',
        };
        break;
    }

    return (
      <Box ref={ref}>
        {type === 'grow' && (
          <Grow {...(others as GrowProps)}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === 'collapse' && (
          <Collapse {...(others as CollapseProps)} sx={positionSX}>
            {children}
          </Collapse>
        )}
        {type === 'fade' && (
          <Fade
            {...(others as FadeProps)}
            timeout={{
              appear: 500,
              enter: 600,
              exit: 400,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
        {type === 'slide' && (
          <Slide
            {...(others as SlideProps)}
            timeout={{
              appear: 0,
              enter: 400,
              exit: 200,
            }}
            direction={direction}
          >
            <Box sx={positionSX}>{children}</Box>
          </Slide>
        )}
        {type === 'zoom' && (
          <Zoom {...(others as ZoomProps)}>
            <Box sx={positionSX}>{children}</Box>
          </Zoom>
        )}
      </Box>
    );
  }
);

export default Transitions;
