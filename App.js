import React, {useEffect, useState} from 'react';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import {setCustomText} from 'react-native-global-props';
import * as Font from 'expo-font';
import { initCalorieMateDb } from './helper/fb-calorie-mate';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import * as Analytics from 'expo-firebase-analytics';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddFoodScreen from './screens/AddFoodScreen';
import FoodAnalysisScreen from './screens/FoodAnalysisScreen';
import TrendsScreen from './screens/TrendsScreen';
import ImageScreen from './screens/ImageScreen';

const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      OpenSans: require('./assets/fonts/OpenSans-Regular.ttf')
    });
    setFontsLoaded(true);
  }

  const customTextProps = {
    style: {
      fontFamily: 'OpenSans'
    }
  }

  useEffect(() => {
    try {
      initCalorieMateDb();
      loadFonts();
      setCustomText(customTextProps);
    } catch (err) {
      console.log(err);
    }

    
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);


  console.ignoredYellowBox = ['Setting a timer'];
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);
        if (previousRouteName !== currentRouteName) {
          Analytics.setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          padding:8
        }}>
          <Stack.Screen name="Log In" options={{headerShown: false}} component={LoginScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Sign Up" component={SignUpScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Home" component={HomeScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Add Food" component={AddFoodScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Food Analysis" component={FoodAnalysisScreen}/>
          <Stack.Screen options={{ headerTitleAlign: 'center'}} name="Trends" component={TrendsScreen}/>
          <Stack.Screen options={{ headerTitle: null}} name="Image" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
