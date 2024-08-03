import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = colors;

    const themeOptionsLight = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        customization
    };

    const themeOptionsDark = {
        colors: color,
        heading: color.grey100, // Light text color for dark mode
        paper: color.grey900,  // Dark background for paper
        backgroundDefault: color.grey900, // Dark background for default
        background: color.grey800, // Darker background
        darkTextPrimary: color.grey300, // Lighter text color
        darkTextSecondary: color.grey500, // Slightly darker text color
        textDark: color.grey100, // Light text for better contrast
        menuSelected: color.secondaryLight, // Highlight color for selected menu item
        menuSelectedBack: color.secondaryDark, // Background color for selected menu item
        divider: color.grey700, // Darker divider color
        customization
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(customization.theme === "light" ? themeOptionsLight : themeOptionsDark),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(customization.theme === "light" ? themeOptionsLight : themeOptionsDark)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(customization.theme === "light" ? themeOptionsLight : themeOptionsDark);

    return themes;
};

export default theme;
