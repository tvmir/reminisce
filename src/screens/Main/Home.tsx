import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../context/actions';
import { connect } from 'react-redux';
import { AppDispatch } from '../../context/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from './Search';
import Notifications from './Notifications';
import Feed from './Feed';
import { theme } from '../../ui/shared/Theme';
import { BottomTabParamList, RootStackParamList } from '../../utils/types';
import { Text, TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils/scale';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface UserProps {
  currentUser: any;
  fetchUser: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddScrapbook'>;
}

const FillInComponent = () => {
  return null;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Home({ currentUser, fetchUser, navigation }: UserProps) {
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(currentUser);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        // headerShown: true,
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
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Map');
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'ios-map' : 'ios-map-outline'}
              color={color}
              size={26}
            />
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

export const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
});

const mapDispatchProps = (dispatch: AppDispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Home);

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
