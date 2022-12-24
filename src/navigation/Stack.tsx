import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import { Provider } from 'react-redux';
import Home from '../screens/Main/Home';
import Map from '../screens/Main/Map';
import { RootStackParamList } from '../utils/types';
import { theme } from '../ui/shared/Theme';
import CameraScrapbook from '../screens/Scrapbook/Camera';
import PhoneLibrary from '../screens/Scrapbook/PhoneLibrary';
import PostScrapbook from '../screens/Scrapbook/PostScrapbook';
import AddScrapbook from '../screens/Scrapbook/AddScrapbook';
import { store } from '../features/store';
import Loading from '../ui/components/Loading';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStackNavigator() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, [setIsLoaded]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
      } else {
        setIsLoaded(true);
        setIsLoggedIn(true);
      }
    });
    return unsub;
  }, []);

  return (
    <>
      {/* TODO: Make a custom loading screen */}
      {!isLoaded ? (
        <>
          <Loading />
        </>
      ) : !isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              animationTypeForReplace: 'pop',
            }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      ) : (
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
                headerBackTitleVisible: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerBackVisible: true,
              }}
              name="Map"
              component={Map}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerShown: true,
                headerBackTitle: '',
                headerTitle: 'New Scrapbook',
              }}
              name="AddScrapbook"
              component={AddScrapbook}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Camera"
              component={CameraScrapbook}
              // navigationKey="Camera"
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="PhoneLibrary"
              component={PhoneLibrary}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: 'Post',
              }}
              name="PostScrapbook"
              // @ts-ignore TODO: Fix this
              component={PostScrapbook}
            />
          </Stack.Navigator>
        </Provider>
      )}
    </>
  );
}
