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

  
  let { timeWithoutSeconds: currTime } = currentTime();
        currTime = +currTime.replace(":", "");

  const pTime = prayerTimes[prayerName].replace(":", "");

    if (currTime < pTime) {

  const notificationId = await Notifications.scheduleNotificationAsync({
    

    content: {
      title: `${prayerName} prayer has started`,
      sound: true
    },
    trigger: {
      hour: +timeToScheduleNotificationFor.substring(0,2),
      minute: +timeToScheduleNotificationFor.substring(3),
      repeats: false
    },
  });

    
  
    console.log(`scheduling notification for ${prayerName} at ${timeToScheduleNotificationFor}. Notification ID is ${notificationId}`);
  }
}


