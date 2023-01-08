import React, { ComponentType, useEffect } from 'react';
import styled from 'styled-components/native';
import { fetchUser } from '../../contexts/slices/users/currentUserSlice';
import { fetchCurrentUserScrapbooks } from '../../contexts/slices/scrapbooks/currentUserScrapbooksSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../screens/Profile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../../screens/Search';
import Notifications from '../../screens/Notifications';
import Feed from '../../screens/Feed';
import { theme } from '../../ui/shared/Theme';
import { BottomTabParamList, RootStackParamList } from '../../utils/types';
import { Text, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import Map from '../../screens/Map';
import {
  createSharedElementStackNavigator,
  SharedElementSceneComponent,
} from 'react-navigation-shared-element';

interface TabProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const wrapInSharedElementStack = (
  Screen: SharedElementSceneComponent<any>,
  name: string
): ComponentType<any> => {
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
const ProfileStack = wrapInSharedElementStack(Profile, 'ProfileStack');

// Creating the bottom tab navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Home({ navigation }: TabProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  // Getting current user's data and their scrapbooks when loading the app
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCurrentUserScrapbooks(currentUser?.uid));
  }, []);

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
          // headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => <TextLogo>reminisce</TextLogo>,
          headerRight: () => (
            <>
              <AddBtn
                onPress={() => navigation.navigate('Add')}
                activeOpacity={0.8}
              >
                <AntDesign name="pluscircleo" size={25} color="white" />
              </AddBtn>
              <MessageBtn activeOpacity={0.8}>
                <Ionicons
                  name="ios-chatbubble-outline"
                  size={27}
                  color="white"
                />
              </MessageBtn>
            </>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'ios-home' : 'ios-home-outline'}
              color={color}
              size={26}
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
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="search"
              color={focused ? '#0FEFFD' : color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name={'map-pin'}
              color={focused ? '#EC00E2' : color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'ios-notifications' : 'ios-notifications-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'ios-person' : 'ios-person-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
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
