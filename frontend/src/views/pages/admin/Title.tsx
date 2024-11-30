import { Box, useTheme, Button, Typography, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';

interface TitleProps extends ButtonProps {
  titleButton?: string;
  des: string;
  link?: string;
}

const HeaderTitle: React.FC<TitleProps> = ({
  titleButton,
  des,
  link,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: 2,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2">{des}</Typography>

      {titleButton && <Button
        {...(link
          ? {
            component: Link,
            to: link,
          }
          : props)}
        variant="outlined"
      >
        {titleButton}
      </Button>}


    </Box>
  );
};

export default HeaderTitle;
