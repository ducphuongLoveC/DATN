import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Define types for props
interface SubCardProps {
  children?: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: React.ReactNode;
  sx?: SxProps<Theme>;
  contentSX?: SxProps<Theme>;
  title?: React.ReactNode;
}

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = React.forwardRef<HTMLDivElement, SubCardProps>(
  (
    {
      children,
      content = true,
      contentClass,
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    },
    ref
  ) => {
    const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

    return (
      <Card
        ref={ref}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          ':hover': {
            boxShadow: defaultShadow,
          },
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{
              p: 2.5,
            }}
            title={<Typography variant="h5">{title}</Typography>}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{
              p: 2.5,
            }}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent
            sx={{
              p: 2.5,
              ...contentSX,
            }}
            className={contentClass || ''}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

SubCard.displayName = 'SubCard';

export default SubCard;
