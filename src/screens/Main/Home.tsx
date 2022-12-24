import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { fetchUser } from '../../features/users/currentUserSlice';
import { fetchUserScrapbooks } from '../../features/scrapbooks/scrapbooksSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from './Search';
import Notifications from './Notifications';
import Feed from './Feed';
import { theme } from '../../ui/shared/Theme';
import { BottomTabParamList, RootStackParamList } from '../../utils/types';
import { Text, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAppDispatch } from '../../utils/hooks';

interface UserProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'AddScrapbook',
    'Map'
  >;
}

const FillInComponent = () => {
  return null;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Home({ navigation }: UserProps) {
  const dispatch = useAppDispatch();

  // Getting current user's data and their scrapbooks when loading the app
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserScrapbooks());
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
        component={Feed}
        options={{
          headerShown: true,
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
                onPress={() => navigation.navigate('AddScrapbook')}
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
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MapFC"
        component={FillInComponent}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Map');
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name={'map-pin'} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
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
        component={Profile}
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
  top: ${verticalScale(16)}px;
`;

const MessageBtn = styled(TouchableOpacity)`
  right: ${horizontalScale(55)}px;
  bottom: ${verticalScale(10)}px;
`;