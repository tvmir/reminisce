import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../../src/context/store/index';
import Map from '../screens/Map';
import Main from '../screens/Main';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
        setIsLoaded(true);
      } else {
        setIsLoggedIn(true);
        setIsLoaded(true);
      }
    });
    return unsub;
  }, []);

  return (
    <>
      {/* TODO: Make a custom loading screen */}
      {!isLoaded ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Loading...</Text>
        </View>
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
              name="Main"
              component={Main}
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
          </Stack.Navigator>
        </Provider>
      )}
    </>
  );
}
