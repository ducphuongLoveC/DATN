import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store'; // Ensure you have a RootState type defined in your store

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports

import Logo from '@/ui-component/Logo';
import { MENU_OPEN } from '@/store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection: FC = () => {
    const defaultId = useSelector(
        (state: RootState) => state.customization.defaultId
    );
    const dispatch = useDispatch();
    return (
        <ButtonBase
            disableRipple
            onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
            component={Link}
            to=""
        >
            <Logo />
        </ButtonBase>
    );
};

export default LogoSection;
