import { styled, Theme } from '@mui/material/styles';
import { CSSObject } from '@mui/system';

const AuthWrapper1 = styled('div')<{ theme?: Theme }>(
    ({ theme }): CSSObject => ({
        backgroundColor: theme?.palette.grey[100],
        minHeight: '100vh',
    })
);

export default AuthWrapper1;
