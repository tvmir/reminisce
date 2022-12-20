import { SafeAreaView, Text } from 'react-native';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { auth } from '../../api/firebase';
import { StackActions, useNavigation } from '@react-navigation/core';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../context/actions';
import { connect } from 'react-redux';
import { AppDispatch } from '../../context/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Search from './Search';
import Notifications from './Notifications';
import Feed from './Feed';
import { theme } from '../../ui/shared/Theme';
import { BottomTabParamList } from '../../utils/types';

interface UserProps {
  currentUser: any;
  fetchUser: () => void;
}

const FillInComponent = () => {
  return null;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function Home({ currentUser, fetchUser }: UserProps) {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(currentUser);

  return (
    // <Wrapper>
    //   <Text>Email: {currentUser?.email} is logged in</Text>
    //   <SignupButton onPress={handleLogout}>
    //     <ButtonText>Logout</ButtonText>
    //   </SignupButton>
    // </Wrapper>
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'ios-home' : 'ios-home-outline'}
              color={color}
              size={26}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
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
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
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
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
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
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" color={color} size={26} />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state: any) => ({
  currentUser: state.userState.currentUser,
});

const mapDispatchProps = (dispatch: AppDispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Home);

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primary};
`;
