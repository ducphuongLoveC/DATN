import { useEffect, useState, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from '@/ui-component/cards/SubCard';

import AnimateButton from '@/ui-component/extended/AnimateButton';
import {
    SET_BORDER_RADIUS,
    SET_FONT_FAMILY,
    TOGGLE_THEME,
} from '@/store/actions';
import { gridSpacing } from '@/store/constant';

// assets
import { IconSettings } from '@tabler/icons-react';

// concat 'px'
function valueText(value: number) {
    return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state: any) => state.customization);

    console.log(customization);

    // drawer on/off
    const [open, setOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    // state - border radius
    const [borderRadius, setBorderRadius] = useState<number>(
        customization.borderRadius
    );
    const handleBorderRadius = (
        event: Event | SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === 'number') {
            setBorderRadius(newValue);
        }
    };

    useEffect(() => {
        dispatch({
            type: SET_BORDER_RADIUS,
            borderRadius,
        });
    }, [dispatch, borderRadius]);

    let initialFont: string;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = useState<string>(initialFont);
    useEffect(() => {
        let newFont: string;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({
            type: SET_FONT_FAMILY,
            fontFamily: newFont,
        });
    }, [dispatch, fontFamily]);

    // state - theme
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const handleToggleThemeMode = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
    };

    useEffect(() => {
        dispatch({
            type: TOGGLE_THEME,
            theme: themeMode,
        });
    }, [dispatch, themeMode]);

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial,
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: '50%',
                    },
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid
                        container
                        spacing={gridSpacing}
                        sx={{
                            p: 3,
                        }}
                    >
                        <Grid item xs={12}>
                            {/* font family */}
                            <SubCard title="Font Family">
                                <FormControl>
                                    <RadioGroup
                                        aria-label="font-family"
                                        value={fontFamily}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => setFontFamily(e.target.value)}
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="Roboto"
                                            control={<Radio />}
                                            label="Roboto"
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                                '& .MuiFormControlLabel-label':
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Poppins"
                                            control={<Radio />}
                                            label="Poppins"
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                                '& .MuiFormControlLabel-label':
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Inter"
                                            control={<Radio />}
                                            label="Inter"
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                                '& .MuiFormControlLabel-label':
                                                    {
                                                        color: theme.palette
                                                            .grey[900],
                                                    },
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* border radius */}
                            <SubCard title="Border Radius">
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    sx={{
                                        mt: 2.5,
                                    }}
                                >
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                        >
                                            4px
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            size="small"
                                            value={borderRadius}
                                            onChange={handleBorderRadius}
                                            getAriaValueText={valueText}
                                            valueLabelDisplay="on"
                                            aria-labelledby="discrete-slider-small-steps"
                                            marks
                                            step={2}
                                            min={4}
                                            max={24}
                                            color="secondary"
                                            sx={{
                                                '& .MuiSlider-valueLabel': {
                                                    color: 'secondary.light',
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                        >
                                            24px
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            {/* theme */}
                            <SubCard title="Theme">
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={themeMode === 'dark'}
                                                onChange={handleToggleThemeMode}
                                            />
                                        }
                                        label={
                                            themeMode === 'light'
                                                ? 'Light Mode'
                                                : 'Dark Mode'
                                        }
                                    />
                                </FormControl>
                            </SubCard>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

export default Customization;
