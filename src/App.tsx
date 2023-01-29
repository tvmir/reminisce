import React from 'react';
import { theme } from './ui/shared/theme';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/client';
import MainDrawer from './navigation/Drawer';

export default function App() {
  // Loading custom fonts
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={theme}>
        <MainDrawer />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
