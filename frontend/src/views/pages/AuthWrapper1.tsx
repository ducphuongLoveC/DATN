import { styled, Theme } from '@mui/material/styles';
import { CSSObject } from '@mui/system';

const AuthWrapper1 = styled('div')<{ theme?: Theme }>(
  ({ theme }): CSSObject => ({
    backgroundColor: theme?.palette.grey[100],
    margin: '20px 0 110px 0',
  })
);

export default AuthWrapper1;
