import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from '../Stack';
import DrawerDetails from '../../ui/components/Drawer/DrawerDetails';
import { Provider } from 'react-redux';
import { store } from '../../contexts/store';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

// Initializing the drawer navigator
const Drawer = createDrawerNavigator();
// Screens that should not have the side menu
const sideMenuDisabledScreens = ['Login', 'Signup'];

export default function MainDrawer() {
  // Function to check if the side menu should be disabled or not
  const isSideMenuDisabled = (route: Partial<Route<string>>): boolean => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login';
    return sideMenuDisabledScreens.includes(routeName);
  };

  return (
    <Provider store={store}>
      <Drawer.Navigator
        id="Drawer"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: 'black',
            width: Dimensions.get('window').width / 1.25,
          },
        }}
        drawerContent={(props) => <DrawerDetails {...props} />}
      >
        <Drawer.Screen
          options={({ route }) => {
            return {
              swipeEnabled: !isSideMenuDisabled(route),
            };
          }}
          name="Main"
          component={MainStackNavigator}
        />
      </Drawer.Navigator>
    </Provider>
  );
}
