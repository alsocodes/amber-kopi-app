import {extendTheme, useColorModeValue} from 'native-base';

export const colors = {
  // primary: '#ffe073',
  primary: '#0FA956', //FED24D
  primaryLight: '#fedb71',
  primaryDark: '#cba83e',
  secondary: '#3F69FF',
  secondaryDark: '#2246c7',
  bgColor: '#F5F5F5',
  statusBarColor: '#ffe073', // '#FB001F',
  drawerBgColor: '#ffe073',
  sectionBg: '#fff',
};

export const darkColors = {
  ...colors,
  bgColor: '#353535',
  statusBarColor: '#353535',
  sectionBg: '#4E4E4E',
};

export const useColors = () => {
  return useColorModeValue(colors, darkColors);
};

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  colors: {
    primary: {
      200: colors.primaryLight,
      300: colors.primary,
      500: colors.primary,
      700: colors.primaryDark,
    },
    secondary: {300: colors.secondary, 500: colors.secondary},
    muted: {100: colors.bgColor},
  },
  components: {
    Button: {
      defaultProps: {
        _text: {
          fontWeight: 'normal',
          // color: 'black',
        },
        borderColor: 'primary.500',
      },
      variants: {
        solid: {
          _text: {
            color: 'black',
          },
        },
        outline: {
          _text: {
            color: 'primary.500',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        height: 34,
        borderColor: '#000',
        bg: 'white',
        color: 'gray.900',
      },
      defaultProps: {
        size: 'sm',
        px: 4,
      },
    },
    Checkbox: {
      baseStyle: {
        padding: 1,
        borderRadius: 'full',
        _checked: {
          borderColor: colors.primary,
          bg: colors.primary,
        },
      },
    },
  },
});

export default theme;
