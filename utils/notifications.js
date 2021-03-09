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

    let { timeWithoutSeconds: currTime } = currentTime();
    currTime = +currTime.replace( ":", "" );

    const todaysTimes = await AsyncStorage.getItem( 'todaysTimes' )
    const prayerTimes = JSON.parse( todaysTimes )

    const pTime = +prayerTimes[ prayerName ].replace( ":", "" );

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
      const timeToPrayerInSeconds = prayerTimeInSeconds( prayerTimes[ prayerName ] ) - currentTimeInSeconds()

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
    } else {
      return 'No notification scheduled for past prayer'
    }
  }

}


