import React, { ReactNode, ForwardedRef } from 'react';
import { motion, useCycle } from 'framer-motion';

// Define the type for the scale object
interface Scale {
  hover?: number;
  tap?: number;
}

// Define the props interface
interface AnimateButtonProps {
  children: ReactNode;
  type?: 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  scale?: number | Scale;
}

// ==============================|| ANIMATION BUTTON ||============================== //

const AnimateButton = React.forwardRef<HTMLDivElement, AnimateButtonProps>(
  (
    { children, type = 'scale', direction = 'right', offset = 10, scale },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    let offset1: number;
    let offset2: number;

    switch (direction) {
      case 'up':
      case 'left':
        offset1 = offset;
        offset2 = 0;
        break;
      case 'right':
      case 'down':
      default:
        offset1 = 0;
        offset2 = offset;
        break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
      case 'rotate':
        return (
          <motion.div
            ref={ref}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              repeatDelay: 0,
            }}
          >
            {children}
          </motion.div>
        );
      case 'slide':
        if (direction === 'up' || direction === 'down') {
          return (
            <motion.div
              ref={ref}
              animate={{
                y: y !== undefined ? y : '',
              }}
              onHoverEnd={() => cycleY()}
              onHoverStart={() => cycleY()}
            >
              {children}
            </motion.div>
          );
        }
        return (
          <motion.div
            ref={ref}
            animate={{
              x: x !== undefined ? x : '',
            }}
            onHoverEnd={() => cycleX()}
            onHoverStart={() => cycleX()}
          >
            {children}
          </motion.div>
        );
      case 'scale':
      default:
        const scaleValue =
          typeof scale === 'number'
            ? {
                hover: scale,
                tap: scale,
              }
            : scale;
        return (
          <motion.div
            ref={ref}
            whileHover={{
              scale: scaleValue?.hover,
            }}
            whileTap={{
              scale: scaleValue?.tap,
            }}
          >
            {children}
          </motion.div>
        );
    }
  }
);

export default AnimateButton;
