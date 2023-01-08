import { ThemeProvider } from 'styled-components/native';
import { theme } from './ui/shared/Theme';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/Stack';
import { useFonts } from 'expo-font';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/client';

export default function App() {
  // Loading custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={theme}>
          <MainStackNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
