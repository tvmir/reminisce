import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Auth/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../api/firebase';
import { Provider } from 'react-redux';
import Home from '../Tab';
import Map from '../../screens/Map';
import { RootStackParamList } from '../../utils/types';
import { theme } from '../../ui/shared/Theme';
import Images from '../../screens/Scrapbook/Images';
import Post from '../../screens/Scrapbook/Post';
import Add from '../../screens/Scrapbook/Add';
import { store } from '../../features/store';
import Loading from '../../ui/components/Loading';
import Signup from '../../screens/Auth/Signup';
import { Text } from 'react-native';

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
          <Stack.Screen
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              animationTypeForReplace: 'pop',
            }}
            name="Signup"
            component={Signup}
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
                  color: theme.colors.primary,
                },
                headerShown: true,
                headerShadowVisible: false,
                headerBackTitle: '',
                headerTitle: 'New Scrapbook',
              }}
              name="Add"
              component={Add}
            />
            <Stack.Screen
              options={{
                headerRight: () => (
                  <Text style={{ color: 'white', fontSize: 15 }}>Next</Text>
                ),
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerShown: true,
                headerShadowVisible: false,
                headerBackTitle: '',
                headerTitle: 'New Scrapbook',
              }}
              name="Images"
              component={Images}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: 'Post',
              }}
              name="Post"
              // @ts-ignore TODO: Fix this
              component={Post}
            />
          </Stack.Navigator>
        </Provider>
      )}
    </>
  );
}
