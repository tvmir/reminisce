import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Auth/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../api/firebase';
import { Provider } from 'react-redux';
import Home from '../Tab';
import { RootStackParamList } from '../../utils/types';
import { theme } from '../../ui/shared/Theme';
import Images from '../../screens/Scrapbook/Images';
import Post from '../../screens/Scrapbook/Post';
import Add from '../../screens/Scrapbook/Add';
import { store } from '../../contexts/store';
import Loading from '../../ui/components/Loading';
import Signup from '../../screens/Auth/Signup';
import { Text, TouchableOpacity } from 'react-native';
import Edit from '../../screens/Profile/Edit';
import Modal from '../../ui/components/Modal';
import UsersProfile from '../../screens/Profile/UsersProfile';
import ExpandedFeed from '../../screens/Scrapbook/ExpandedFeed';
import Expanded from '../../screens/Scrapbook/Expanded';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createSharedElementStackNavigator();

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
            }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
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
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                },
                headerShown: true,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitle: 'New Scrapbook',
              }}
              name="Add"
              component={Add}
            />
            <Stack.Screen
              options={({}) => ({
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
              })}
              name="Images"
              component={Images}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitle: 'Post',
              }}
              name="Post"
              // @ts-ignore TODO: Fix this
              component={Post}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitle: 'Edit Profile',
              }}
              name="EditProfile"
              component={Edit}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                headerTitle: '',
                // animation: 'slide_from_bottom',
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                // headerTitle: 'Edit Profile',
              }}
              name="UsersProfile"
              component={UsersProfile}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                headerTitle: '',
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
              }}
              name="ExpandedFeed"
              component={ExpandedFeed}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                headerTitle: '',
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
              }}
              name="Expanded"
              component={Expanded}
              sharedElements={(route) => {
                return [route.params.item.id];
              }}
            />
          </Stack.Navigator>
          <Modal />
        </Provider>
      )}
    </>
  );
}
