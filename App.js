import React from 'react';
import MainHomeScreen from './screens/MainHomeScreen';
import SocialScreen from './screens/SocialScreen'
import QuranScreen from './screens/QuranScreen'
import DuaScreen from './screens/DuaScreen'
//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// redux
import { Provider } from 'react-redux'
import store from './redux/store'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={ MainHomeScreen } />
          <Tab.Screen name="Socials" component={ SocialScreen } />
          <Tab.Screen name="Qur'an" component={ QuranScreen } />
          <Tab.Screen name="Du'a" component={ DuaScreen } />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

