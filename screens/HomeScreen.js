
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl, Pressable, Platform, Image, Animated, Alert, AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import { Ionicons } from '@expo/vector-icons';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { updateNotificationID } from '../redux/idsSlice'

//components
import Table from '../components/table'
import WebViews from '../components/WebViews'
//utility functions
import wait from '../utils/wait'
import { getDate, tmrwHijriDate } from '../utils/getDate'
import currentTime from '../utils/currentTime'
import getTimes from '../utils/getTimes'
import shouldHighlight from "../utils/shouldHighlight";
import scheduleNotification from '../utils/notifications';
import Bugsnag from '@bugsnag/expo'



export default function HomeScreen( { navigation } ) {

  const appState = useRef( AppState.currentState )
  const timer = useRef()

  const [ refreshing, setRefreshing ] = useState( 0 );
  const [ showRefresh, setShowRefresh ] = useState( false );
  const [ showTmrwTimes, setShowTmrwTimes ] = useState( false )
  const [ prayerTimes, setPrayerTimes ] = useState( {} )
  const [ tmrwsTimes, setTmrwsTimes ] = useState( {} )
  const [ highlight, setHighlight ] = useState( {} )
  const [ hijriDate, setHijriDate ] = useState( '' )
  const [ animationDidComplete, setAnimationDidComplete ] = useState( false )
  // const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const { timeWithSeconds } = currentTime()
  const [ timeWithSecs, setTimeWithSecs ] = useState( timeWithSeconds )

  const notificationStatuses = useSelector( state => state.notifications )
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback( () => {
      getTimes( { forceRefresh: true } )
        .then( async ( times ) => {
          const { timeWithSeconds } = currentTime()
          setTimeWithSecs( timeWithSeconds )
          const [ todaysTimes, tmrwsPTimes, hijriDate ] = times;
          setPrayerTimes( todaysTimes );
          setTmrwsTimes( tmrwsPTimes );
          setHijriDate( hijriDate )
          // highlighting logic

          const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa } = todaysTimes;

          let pTimes = { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa }

          const willHighlight = shouldHighlight( ...Object.values( pTimes ) );

          setHighlight( willHighlight );

          timer.current = setInterval( () => {
            const willHighlight = shouldHighlight( ...Object.values( pTimes ) )
            setHighlight( willHighlight )

          }, 1000 )


          //notifications logic
          //remove previous notifications in case refreshed page.
          await Notifications.cancelAllScheduledNotificationsAsync()


          // add tmrwFajr into pTimes for notifications loop
          const { Fajr: tmrwFajr } = tmrwsPTimes
          pTimes.tmrwFajr = tmrwFajr

          for ( let prayerName in pTimes ) {
            if ( notificationStatuses[ prayerName ] ) {
              // schedule notification
              const notificationID = await scheduleNotification( prayerName )
              //save notificationID to state
              const pNameNotification = `${ prayerName }Notification`
              dispatch( updateNotificationID( { pNameNotification, notificationID } ) )
            }
          }

        } ).catch( ( err ) => {

          Bugsnag.notify( 'something went wrong fetching the times', err )
          Alert.alert( 'Something went wrong fetching the times.', 'This could be a connectivity issue. Please try again. If it still doesn\'t work, get in touch with the WISE admin.' )

        } );
      //returning a function from here will cause it to run on app load. This is why the clearInterval() has been removed from here.
    }, [ notificationStatuses, refreshing ] )
  )

  const handleAppStateChange = ( nextAppState ) => {
    if ( appState.current === 'active' && nextAppState.match( /inactive|background/ ) ) {
      clearInterval( timer.current )
    } else {
      //change the refreshing state to trigger the useFocusEffect function to run.
      if ( Table ) {
        setRefreshing( refreshing + 1 )
      }
    }
    AppState.current = nextAppState
  }

  useEffect( () => {
    AppState.addEventListener( 'change', handleAppStateChange )

    return () => {
      AppState.removeEventListener( 'change', handleAppStateChange )
    }
  }, [] )


  const handlePress = async () => {

    if ( Platform.OS === 'ios' ) await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
    navigation.navigate( 'Settings' )

  };


  //animation values for tables
  const tableAnimation = useRef( new Animated.Value( 0 ) ).current

  const handleHold = async () => {
    setShowTmrwTimes( true )

    Animated.timing( tableAnimation, {
      toValue: 600,
      duration: 275,
      useNativeDriver: true
    } ).start( async () => {
      if ( Platform.OS === 'ios' ) await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light )
      setAnimationDidComplete( true )
    } )


  }
  const handleRelease = () => {
    setShowTmrwTimes( false )
    Animated.timing( tableAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    } ).start( async () => {
      if ( animationDidComplete ) {
        if ( Platform.OS === 'ios' ) await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light )
      }
      setAnimationDidComplete( false )
    } )
  }


  const onRefresh = () => {
    setShowRefresh( true );
    setTimeWithSecs( timeWithSeconds )
    setRefreshing( prevState => prevState + 1 )
    wait( 1000 ).then( () => setShowRefresh( false ) );
  };


  return (
    <View style={ styles.container }>
      <SafeAreaView />

      <StatusBar barStyle={ "dark-content" } />

      <ScrollView
        style={ styles.scrollContainer }
        showsVerticalScrollIndicator={ false }
        refreshControl={
          <RefreshControl
            refreshing={ showRefresh }
            onRefresh={ onRefresh }
            tintColor={ "rgb(161, 43, 110)" }
            title={ "last refreshed at " + timeWithSecs }
            titleColor={ "#888" }
          />
        }
      >
        <Text style={ styles.refreshNotice }>Pull to refresh</Text>


        <Pressable
          style={ { position: 'absolute', right: 20, top: 31, zIndex: 3, elevation: 3 } }
          onPressIn={ handlePress }
          hitSlop={ 8 }
        >
          <Ionicons name="settings-sharp" size={ 25 } color="#A12B6E" />
        </Pressable>

        <Image
          source={ require( '../assets/wiseLogo/wiseLogo.png' ) }
          fadeDuration={ 0 }
          style={ { height: 50, width: 50, position: 'absolute', top: 37, left: 15 } }

        />

        <Text style={ [ styles.date, { marginBottom: 0 } ] }>{ showTmrwTimes ? getDate( showTmrwTimes ) : getDate() }</Text>

        <Text style={ [ styles.date, { fontSize: 15 } ] }>
          { showTmrwTimes ? tmrwHijriDate( hijriDate ) : hijriDate }
        </Text>
        <View style={ { alignItems: 'center' } }>
          <Animated.View style={ {
            position: 'relative',
            transform: [ { translateX: tableAnimation },
            {
              scale: tableAnimation.interpolate( {
                inputRange: [ 0, 600 ],
                outputRange: [ 1, 0 ]
              } )
            } ],
          }

          }>
            <Table
              prayerTimes={ prayerTimes }
              highlight={ highlight }
            />
          </Animated.View>
          <Animated.View style={ {
            position: 'absolute',
            transform: [ {
              translateX: tableAnimation.interpolate( {
                inputRange: [ 0, 600 ],
                outputRange: [ -600, 0 ]
              } )
            }, {
              scale: tableAnimation.interpolate( {
                inputRange: [ 0, 600 ],
                outputRange: [ 0, 1 ]
              } )
            } ]
          } }>
            <Table
              tmrwsTimes={ tmrwsTimes }
            />
          </Animated.View>
        </View>

        <Pressable style={ ( { pressed } ) => [
          styles.btn,
          {
            backgroundColor: pressed ? '#790D5A' : '#A12B6E', marginVertical: 50
          } ] }
          delayLongPress={ 120 }
          onLongPress={ handleHold }
          onPressOut={ handleRelease }
          hitSlop={ 15 }
        >
          <Text style={ styles.btnText }>Hold For Tomorrow's Times</Text>
        </Pressable>

        <WebViews refreshing={ refreshing } />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: "#ebecf0",

  },
  date: {
    fontSize: 21,
    marginTop: 10,
    marginBottom: 25,
    color: "#444",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    width: "100%",
  },
  refreshNotice: {
    textAlign: "center",
    color: "#888",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1.3,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    borderRadius: 7,
    backgroundColor: 'rgb(161, 43, 110)',
    width: "70%",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: "#0000",
  },

} );

