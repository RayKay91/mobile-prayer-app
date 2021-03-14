
import React, { useState, useCallback } from 'react'
import { StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl, Pressable, Platform, Button, Alert } from 'react-native';
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
import getDate from '../utils/getDate'
import currentTime from '../utils/currentTime'
import getTimes from '../utils/getTimes'
import shouldHighlight from "../utils/shouldHighlight";
import scheduleNotification from '../utils/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen( { navigation } ) {

  const [ refreshing, setRefreshing ] = useState( 0 );
  const [ showRefresh, setShowRefresh ] = useState( false );
  const [ showTmrwTimes, setShowTmrwTimes ] = useState( false )
  const [ prayerTimes, setPrayerTimes ] = useState( {} )
  const [ tmrwsTimes, setTmrwsTimes ] = useState( {} )
  const [ highlight, setHighlight ] = useState( {} )

  const { timeWithSeconds } = currentTime()
  const [ timeWithSecs, setTimeWithSecs ] = useState( timeWithSeconds )

  const notificationStatuses = useSelector( state => state.notifications )
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback( () => {
      getTimes()
        .then( async ( times ) => {
          console.log(
            "\nfetching times on " + Platform.OS + " " + Platform.Version
          );

          const [ todaysTimes, tmrwsPTimes ] = times;
          setPrayerTimes( todaysTimes );
          setTmrwsTimes( tmrwsPTimes );

          // highlighting logic

          const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa } = todaysTimes;

          let pTimes = { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa }

          const willHighlight = shouldHighlight( ...Object.values( pTimes ) );

          setHighlight( willHighlight );


          //notifications logic
          //remove previous notifications in case refreshed page.
          await Notifications.cancelAllScheduledNotificationsAsync()


          // add tmrwFajr into pTimes for notifications loop
          const { Fajr: tmrwFajr } = tmrwsPTimes
          pTimes.tmrwFajr = tmrwFajr

          for ( let prayerName in pTimes ) {
            if ( notificationStatuses[ prayerName ] ) {
              dispatch( updateNotificationID( 'cancelled' ) )
              // schedule notification
              const notificationID = await scheduleNotification( prayerName )
              //save notificationID to state
              const pNameNotification = `${ prayerName }Notification`
              dispatch( updateNotificationID( { pNameNotification, notificationID } ) )
            }
          }

        } ).catch( ( err ) => console.log( `something went wrong in HomeScreen.js useFocusEffect ${ err }` ) );
    }, [ notificationStatuses, refreshing ] )
  )

  const handlePress = async () => {

    if ( Platform.OS === 'ios' ) await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
    navigation.navigate( 'Settings' )

  };

  const handleHold = async () => {
    setShowTmrwTimes( true )
    if ( Platform.OS === 'ios' ) {

      await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
      await wait( 50 )
      await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Medium );
      await wait( 140 )
      await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
    }

  }
  const handleRelease = () => {
    setShowTmrwTimes( false )
  }


  const onRefresh = () => {
    setShowRefresh( true );
    setTimeWithSecs( timeWithSeconds )
    setRefreshing( prevState => prevState + 1 )
    wait( 1000 ).then( () => setShowRefresh( false ) );
  };

  const { gregorianDate, hijriDate } = getDate();
  return (
    <View style={ styles.container }>
      <SafeAreaView />

      <StatusBar barStyle={ "dark-content" } />
      <Button title='scheduled notifications' onPress={ async () => {
        let n = await Notifications.getAllScheduledNotificationsAsync()
        n = JSON.stringify( n )
        Alert.alert( n )
      } }></Button>
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
          onPress={ handlePress }
        >
          <Ionicons name="settings-sharp" size={ 25 } color="#A12B6E" />
        </Pressable>


        <Text style={ [ styles.date, { marginBottom: 0 } ] }>{ gregorianDate }</Text>

        <Text style={ [ styles.date, { fontSize: 15 } ] }>
          { hijriDate.replace( /\([^()]*\)/, '' ) }
        </Text>



        <Table
          prayerTimes={ prayerTimes }
          tmrwsTimes={ tmrwsTimes }
          showTmrwTimes={ showTmrwTimes }
          highlight={ highlight }
        />

        <Pressable style={ ( { pressed } ) => [
          styles.btn,
          {
            backgroundColor: pressed ? '#790D5A' : '#A12B6E', marginVertical: 50
          } ] }
          onPressIn={ handleHold }
          onPressOut={ handleRelease }
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
    marginTop: 15,
    marginBottom: 20,
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

