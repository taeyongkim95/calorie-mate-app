import React, {useEffect} from 'react';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import {setCustomText} from 'react-native-global-props';
import { useFonts, OpenSans_400Regular} from '@expo-google-fonts/open-sans';
import { initCalorieMateDb } from './helper/fb-calorie-mate';
import firebase from 'firebase/app';
import auth from 'firebase/auth';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddFoodScreen from './screens/AddFoodScreen';
import FoodAnalysisScreen from './screens/FoodAnalysisScreen';

export default function App() {

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
  });

  const customTextProps = {
    style: {
      fontFamily: 'OpenSans_400Regular'
    }
  }

  useEffect(() => {
    try {
      initCalorieMateDb();
    } catch (err) {
      console.log(err);
    }
  }, []);

  setCustomText(customTextProps);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          padding:8
        }}>
          <Stack.Screen name="Log In" options={{headerShown: false}} component={LoginScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Sign Up" component={SignUpScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Home" component={HomeScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Add Food" component={AddFoodScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Food Analysis" component={FoodAnalysisScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
