// src/theme/theme.d.ts

// Mở rộng kiểu `Palette` và `PaletteOptions` để thêm thuộc tính `border` và mở rộng `background` với `paper2`
declare module '@mui/material/styles' {
  interface TypeBackground {
    paper2: string; // Thêm thuộc tính paper2 vào TypeBackground
  }

  interface Palette {
    border: {
      borderLv1: string;
      borderLv2: string;
      default: string;
    };
  }

  interface PaletteOptions {
    border?: {
      borderLv1?: string;
      borderLv2?: string;
      default?: string;
    };
    background?: Partial<TypeBackground>; // Cho phép mở rộng background
  }
}

export default function themePalette(theme: any) {
  return {
    mode: theme?.state?.navType,
    common: {
      black: theme.colors?.darkPaper,
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      200: theme.colors?.primary200,
      800: theme.colors?.primary800,
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      200: theme.colors?.secondary200,
      800: theme.colors?.secondary800,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark,
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.textSecondary,
      600: theme.heading,
      700: theme.textPrimary,
      900: theme.textDark,
    },
    dark: {
      light: theme.colors?.textPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper,
    },
    text: {
      primary: theme.textPrimary,
      secondary: theme.textSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100,
    },
    border: {
      borderLv1: theme.paper,
      borderLv2: theme.paper2,
      default: theme.colors,
    },
    background: {
      paper: theme.paper,
      paper2: theme.paper2, // Thêm paper2 vào background
      default: theme.backgroundDefault,
    },
  };
}
