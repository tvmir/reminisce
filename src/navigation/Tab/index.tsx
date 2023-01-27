import React, { ComponentType, useEffect } from 'react';
import styled from 'styled-components/native';
import { fetchCurrentUser } from '../../contexts/slices/users/currentUserSlice';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../../screens/Search';
import Notifications from '../../screens/Notifications';
import Feed from '../../screens/Feed';
import { theme } from '../../ui/shared/Theme';
import { BottomTabParamList } from '../../utils/types';
import { LogBox, Text, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import { useAppDispatch } from '../../utils/hooks';
import Map from '../../screens/Map';
import {
  createSharedElementStackNavigator,
  SharedElementSceneComponent,
} from 'react-navigation-shared-element';
import { auth } from '../../api/firebase';

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
const NotificationsStack = wrapInSharedElementStack(
  Notifications,
  'NotificationsStack'
);

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

  const FillInComponent = () => {
    return null;
  };

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
        name="Notifications"
        component={NotificationsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={'ios-notifications-outline'}
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

      {/* <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name={'user'}
              color={focused ? '#0FEFFD' : color}
              size={size}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

// Styles
const TextLogo = styled(Text)`
  font-family: 'Montserrat';
  font-size: 27px;
  top: ${verticalScale(3)}px;
  left: ${horizontalScale(12)}px;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const AddBtn = styled(TouchableOpacity)`
  right: ${horizontalScale(12)}px;
  top: ${verticalScale(16.5)}px;
`;

const MessageBtn = styled(TouchableOpacity)`
  right: ${horizontalScale(55)}px;
  bottom: ${verticalScale(10)}px;
`;
