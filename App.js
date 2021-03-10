import React from 'react';
import { Text } from 'react-native'
//tabs
import MainHomeScreen from './screens/MainHomeScreen';
import SocialScreen from './screens/SocialScreen'
import QuranScreen from './screens/QuranScreen'
import DuaScreen from './screens/DuaScreen'
import ActivitiesScreen from './screens/ActivitiesScreen'
//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//tab bar icons
import TabIcon from './components/tabIcon'
import { Entypo } from '@expo/vector-icons';
// redux + state persistence
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const Tab = createBottomTabNavigator();

const getTabIcon = ( routeName, focused ) => {
  let path
  if ( routeName === 'Home' ) {

    focused ?
      path = require( './assets/tabIcons/homeIcon/homeIconColored.png' )
      : path = require( './assets/tabIcons/homeIcon/homeIcon.png' )
  }
  if ( routeName === 'Socials' ) {

    focused ?
      path = require( './assets/tabIcons/socialsIcon/socialsIconColored.png' )
      : path = require( './assets/tabIcons/socialsIcon/socialsIcon.png' )
  }
  if ( routeName === 'Activities' ) {

    focused ?
      path = require( './assets/tabIcons/activitiesIcon/activitiesIconColored.png' )
      : path = require( './assets/tabIcons/activitiesIcon/activitiesIcon.png' )
  }
  if ( routeName === "Qur'an" ) {

    focused ?
      path = require( './assets/tabIcons/quranIcon/quranIconColored.png' )
      : path = require( './assets/tabIcons/quranIcon/quranIcon.png' )
  }
  if ( routeName === "Du'a" ) {

    focused ?
      path = require( './assets/tabIcons/duaIcon/duaIconColored.png' )
      : path = require( './assets/tabIcons/duaIcon/duaIcon.png' )
  }

  return path

}

export default function App() {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <NavigationContainer>
          <Tab.Navigator screenOptions={ ( { route } ) => ( {
            tabBarIcon: ( { focused } ) => {
              if ( route.name === "Qur'an" ) return <TabIcon source={ getTabIcon( route.name, focused ) } height={ focused ? 28 : 25 } width={ focused ? 46 : 43 } />

              return <TabIcon source={ getTabIcon( route.name, focused ) } height={ focused ? 24 : 20 } width={ focused ? 24 : 20 } />
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

