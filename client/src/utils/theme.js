import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
    colors: {
        brand:{
          50: '#f3eaff',
          100: '#d6c1f4',
          200: '#b69ae7',
          300: '#9571db',
          400: '#7249d0',
          500: '#612fb6',
          600: '#53258f',
          700: '#401967',
          800: '#2a0f40',
          900: '#14031b',
        },
    }, breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    }, fonts: {
        heading: `'Inter Variable', sans-serif`,
        body: `'Inter Variable', sans-serif`,
    }, config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
})

export default theme;
