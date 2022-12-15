import { ThemeProvider } from 'styled-components/native';
import { theme } from './components/ui/Theme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Feed from './screens/Feed';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false, animationTypeForReplace: 'pop' }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
            }}
            name="Feed"
            component={Feed}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
