import * as Notifications from "expo-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage'
import currentTime from './currentTime'

async function requestNotificationPermission() {
  return await Notifications.requestPermissionsAsync({
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
  });

}

export async function notificationPermission() {
  const settings = await Notifications.getPermissionsAsync();

  if (settings.status === "undetermined") {
    await requestNotificationPermission();
  }

  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export default async function scheduleNotification(prayerName) {
  //check if the prayer time is after current time. If so schedule notification.

  
  let { timeWithoutSeconds: currTime } = currentTime();
  currTime = +currTime.replace(":", "");
  
  const todaysTimes = await AsyncStorage.getItem('todaysTimes')
  const prayerTimes = JSON.parse(todaysTimes)
  
  
  const pTime = +prayerTimes[prayerName].replace(":", "");
  
  //cancel previous notification
  
  const prevNotificationIDForCancellation = await AsyncStorage.getItem(`${prayerName}NotificationID`)
  
  if(prevNotificationIDForCancellation !== null){

          // console.log('\ncancelling prev notification --> ' + prayerName + ' ' + prevNotificationIDForCancellation);
      await Notifications.cancelScheduledNotificationAsync(prevNotificationIDForCancellation)
    }
  

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (currTime < pTime) {

        const notificationID = await Notifications.scheduleNotificationAsync({
        

        content: {
          title: `${prayerName} prayer has started`,
          sound: true
        },
        trigger: {
          hour: +prayerTimes[prayerName].substring(0,2),
          minute: +prayerTimes[prayerName].substring(3),
          repeats: false
        },
      });

      await AsyncStorage.setItem(`${prayerName}NotificationID`, notificationID)

      console.log(`\nscheduling notification for ${prayerName} at ${prayerTimes[prayerName]}. Notification ID is ${notificationID.substring(10)}`);

  }

}


