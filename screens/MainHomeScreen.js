import React from 'react'
import { Platform } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from './HomeScreen'
import NotificationScreen from './NotificationsScreen'
enableScreens()
const Stack = createNativeStackNavigator();

function MainHomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={ { headerShown: false } } name="Home" component={ HomeScreen } />
      <Stack.Screen name="Notifications" component={ NotificationScreen } />
    </Stack.Navigator>
  );
}

export default MainHomeScreen;