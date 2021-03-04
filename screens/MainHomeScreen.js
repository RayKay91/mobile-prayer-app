import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import NotificationScreen from './NotificationsScreen'

const Stack = createStackNavigator();

function MainHomeScreen() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
  );
}

export default MainHomeScreen;