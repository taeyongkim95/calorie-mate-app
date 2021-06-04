import React from 'react';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
