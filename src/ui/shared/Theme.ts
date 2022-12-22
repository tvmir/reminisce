import { DefaultTheme, Theme } from '@react-navigation/native';

const theme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: '#EDEDED',
    background: '#050505',
    // TODO: Update these colors to match the app's color scheme
    card: '#1C1C1C',
    text: '#EDEDED',
    border: '#EDEDED',
    notification: '#EDEDED',
  },
};

export { theme };
