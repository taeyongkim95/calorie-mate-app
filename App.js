import React from 'react';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from "./screens/WelcomeScreen";
import AddFoodScreen from "./screens/AddFoodScreen";
import FoodAnalysisScreen from "./screens/FoodAnalysisScreen";

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name="Add Food" component={AddFoodScreen}/>
          <Stack.Screen name="Welcome" component={WelcomeScreen}/>
          <Stack.Screen name="Food Analysis" component={FoodAnalysisScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
