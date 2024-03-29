import React, { ComponentType, useEffect } from 'react';
import { fetchCurrentUser } from '../../contexts/slices/users/currentUserSlice';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../../screens/Search';
import Feed from '../../screens/Feed';
import { theme } from '../../ui/shared/theme';
import { BottomTabParamList } from '../../utils/types';
import { LogBox, View } from 'react-native';
import { useAppDispatch, useChat } from '../../utils/hooks';
import Map from '../../screens/Map';
import {
  createSharedElementStackNavigator,
  SharedElementSceneComponent,
} from 'react-navigation-shared-element';
import { auth } from '../../api/firebase';
import Chat from '../../screens/Chat';

const wrapInSharedElementStack = (
  Screen: SharedElementSceneComponent<any>,
  name: string
): ComponentType => {
  const SharedStack = createSharedElementStackNavigator();
  return () => (
    <SharedStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={name}
    >
      <SharedStack.Screen name={name} component={Screen} />
    </SharedStack.Navigator>
  );
};

// Wrapping each screen in a shared element stack
const FeedStack = wrapInSharedElementStack(Feed, 'FeedStack');
const SearchStack = wrapInSharedElementStack(Search, 'SearchStack');
const MapStack = wrapInSharedElementStack(Map, 'MapStack');
const ChatStack = wrapInSharedElementStack(Chat, 'ChatStack');

// Creating the bottom tab navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    LogBox.ignoreLogs([
      `undefined is not an object (evaluating '_n7.indexOf')]`,
    ]);
  }, []);

  // Getting current user's data and their scrapbooks when loading the app
  useEffect(() => {
    dispatch(fetchCurrentUser(auth.currentUser?.uid));
    dispatch(fetchCurrentUserScrapbooks(auth.currentUser?.uid));
  }, []);

  const FillInComponent = () => null;

  useChat();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          borderTopColor: theme.colors.background,
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={{
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name={'home'}
              color={focused ? '#0FEFFD' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          headerShown: false,
          headerTitle: '',
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="search"
              color={focused ? '#0FEFFD' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddFC"
        component={FillInComponent}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Add');
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name={'plus'}
              color={focused ? '#0FEFFD' : color}
              size={size + 4}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatStack}
        options={{
          headerShown: false,
          headerBackground: () => (
            <View
              style={{
                backgroundColor: theme.colors.background,
              }}
            ></View>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={'ios-chatbox-outline'}
              color={focused ? '#0FEFFD' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name={'map-pin'}
              color={focused ? '#0FEFFD' : color}
              size={size - 3}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
