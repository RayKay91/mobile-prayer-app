import React from 'react'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'
enableScreens()
const Stack = createNativeStackNavigator();

function MainHomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={ { headerShown: false } } name="Home" component={ HomeScreen } />
      <Stack.Screen name="Settings" component={ SettingsScreen } />
    </Stack.Navigator>
  );
}

export default MainHomeScreen;