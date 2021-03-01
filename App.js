import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SocialScreen from './screens/SocialScreen'
//navigation
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Socials" component={SocialScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

