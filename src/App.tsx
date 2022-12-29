import { ThemeProvider } from 'styled-components/native';
import { theme } from './ui/shared/Theme';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/Stack';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      staleTime: Infinity,
    },
  },
});

export default function App() {
  // Fonts
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={theme}>
          <MainStackNavigator />
          {/* <Modal /> */}
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
