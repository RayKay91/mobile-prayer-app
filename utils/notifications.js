import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage'
import currentTime from './currentTime'
const currentTimeInSeconds = require( './currentTimeInSeconds' )
const prayerTimeInSeconds = require( './prayerTimeInSeconds' )

async function requestNotificationPermission() {
  return await Notifications.requestPermissionsAsync( {
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowDisplayInCarPay: true,
      allowCriticalAlerts: true,
      provideAppNotificationSettings: true,
      allowProvisional: true,
      allowAnnouncements: true,
    },
  } );

}

export async function notificationPermission() {
  const settings = await Notifications.getPermissionsAsync();

  if ( settings.status === "undetermined" ) {
    await requestNotificationPermission();
  }

  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export default async function scheduleNotification( prayerName ) {
  //check if the prayer time is after current time. If so schedule notification.

  const hasPermission = await notificationPermission()
  if ( hasPermission ) {

    let todaysTimes = await AsyncStorage.getItem( 'todaysTimes' )
    todaysTimes = JSON.parse( todaysTimes )

    let { timeWithoutSeconds: currTime } = currentTime();
    currTime = +currTime.replace( ":", "" );

    if ( prayerName !== 'tmrwFajr' ) {

      const pTime = +todaysTimes[ prayerName ].replace( ":", "" );

      if ( currTime < pTime ) {

        //allow notifications while in app
        Notifications.setNotificationHandler( {
          handleNotification: async () => ( {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          } ),
        } );
        //calculate time to prayer in seconds. Hours and minutes entry not working on Android.
        const timeToPrayerInSeconds = prayerTimeInSeconds( todaysTimes[ prayerName ] ) - currentTimeInSeconds()

        const notificationID = await Notifications.scheduleNotificationAsync( {


          content: {
            title: `${ prayerName } prayer has started`,
            sound: true
          },
          trigger: {
            seconds: timeToPrayerInSeconds
          },
        } );
        return notificationID
      }
    } else if ( prayerName === 'tmrwFajr' ) {

      let tmrwsTimes = await AsyncStorage.getItem( 'tmrwsTimes' )
      tmrwsTimes = JSON.parse( tmrwsTimes )

      let secondsToTomorrowsFajr

      //add 24 hours in seconds for notification countdown timer if before fajr, otherwise get the remaining seconds to midnight, add on prayerTimeInSeconds to get remaining seconds to tmrwFajr
      const fajrTimeForComparison = +todaysTimes.Fajr.replace( ':', '' )

      if ( currTime < fajrTimeForComparison ) {

        secondsToTomorrowsFajr = prayerTimeInSeconds( tmrwsTimes.Fajr ) - currentTimeInSeconds()
        secondsToTomorrowsFajr += 86400
      } else {
        const remainingSecsToMidnight = 86400 - currentTimeInSeconds()
        const fajrInSecondsAfterMidnight = prayerTimeInSeconds( tmrwsTimes.Fajr )
        secondsToTomorrowsFajr = remainingSecsToMidnight + fajrInSecondsAfterMidnight

      }

      //allow notifications while in app
      Notifications.setNotificationHandler( {
        handleNotification: async () => ( {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        } ),
      } );


      const notificationID = await Notifications.scheduleNotificationAsync( {

        content: {
          title: `Fajr prayer has started`,
          sound: true
        },
        trigger: {
          seconds: secondsToTomorrowsFajr
        },
      } );
      return notificationID
    } else {
      return 'No notification scheduled for past prayer'
    }

  }

}


