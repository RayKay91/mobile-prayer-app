import React from 'react';
//tabs
import MainHomeScreen from './screens/MainHomeScreen';
import SocialScreen from './screens/SocialScreen'
import QuranScreen from './screens/QuranScreen'
import DuaScreen from './screens/DuaScreen'
import ActivitiesScreen from './screens/ActivitiesScreen'
//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// redux + state persistence
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={ MainHomeScreen } />
            <Tab.Screen name="Socials" component={ SocialScreen } />
            <Tab.Screen name="Activities" component={ ActivitiesScreen } />
            <Tab.Screen name="Qur'an" component={ QuranScreen } />
            <Tab.Screen name="Du'a" component={ DuaScreen } />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

