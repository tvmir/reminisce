import { ThemeProvider } from 'styled-components/native';
import { theme } from './ui/shared/Theme';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/Stack';
import { useFonts } from 'expo-font';

export default function App() {
  // Fonts
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
