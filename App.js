import React from 'react';
import { Text } from 'react-native'
//tab bar icons
import TabIcon from './components/tabIcon'
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
//utils
import getTabIcon from './utils/getTabIcon'


const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <NavigationContainer>
          <Tab.Navigator screenOptions={ ( { route } ) => ( {
            tabBarIcon: ( { focused } ) => {
              if ( route.name === "Qur'an" ) return <TabIcon source={ getTabIcon( route.name, focused ) } height={ focused ? 28 : 25 } width={ focused ? 46 : 40 } />

              return <TabIcon source={ getTabIcon( route.name, focused ) } height={ focused ? 24 : 22 } width={ focused ? 24 : 22 } />
            },
            tabBarLabel: ( { focused } ) => <Text style={ { color: '#A12B6E', fontSize: 12 } }>{ focused ? route.name : null }</Text>
          } ) }
          >
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

