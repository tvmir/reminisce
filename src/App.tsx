import { ThemeProvider } from 'styled-components/native';
import { theme } from './ui/shared/Theme';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/Stack';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
