import { createTheme } from '@mui/material/styles';

// assets
import colors from '@/assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} state state parameter object
 */

export const theme = (state: any) => {
  
  const color = colors;
  const themeOptionsLight = {
    colors: color,
    borderColor: color.gray,
    heading: color.grey900,
    paper: color.paper,
    paper2: color.primaryLight,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    textPrimary: color.grey700,
    textSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    state,
  };

  const themeOptionsDark = {
    colors: color,
    heading: color.grey100, // Light text color for dark mode
    paper: color.black, // Dark background for paper
    paper2: color.black2,
    // backgroundDefault: color.grey900, // Dark background for default
    background: color.grey800, // Darker background
    textPrimary: color.grey300, // Lighter text color
    textSecondary: color.grey500, // Slightly darker text color
    textDark: color.grey100, // Light text for better contrast
    menuSelected: color.secondaryLight, // Highlight color for selected menu item
    menuSelectedBack: color.secondaryDark, // Background color for selected menu item
    divider: color.grey700, // Darker divider color
    state,
  };

  const themeOptions: any = {
    direction: 'ltr',
    palette: themePalette(
      state.theme === 'light' ? themeOptionsLight : themeOptionsDark
    ),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(
      state.theme === 'light' ? themeOptionsLight : themeOptionsDark
    ),
   
    //  components: { 
    //   MuiCssBaseline: {
    //     styleOverrides: {},
    //   },
    // },
    // classnamePrefix: 'ftech' 
  };

  const themes = createTheme(themeOptions);

  themes.components = componentStyleOverrides(
    state.theme === 'light' ? themeOptionsLight : themeOptionsDark
  );

  return themes;
};

export default theme;
