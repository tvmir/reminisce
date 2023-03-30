import { DefaultTheme, Theme } from '@react-navigation/native';

const theme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: '#EDEDED',
    background: '#000',
    card: '#1C1C1C',
    text: '#EDEDED',
    border: '#EDEDED',
    notification: '#EDEDED',
  },
};

export { theme };
