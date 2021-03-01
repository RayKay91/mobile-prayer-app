import * as Notifications from "expo-notifications";
//util funcs
const currentTimeInSeconds = require('./currentTimeInSeconds')
const prayerTimeInSeconds = require('./prayerTimeInSeconds')

async function requestNotificationPermission() {
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowDisplayInCarPay: true,
      allowCriticalAlerts: true,
      provideAppNotificationSettings: true,
      allowAnnouncements: true,
    },
  });
}

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();

  if (settings.status === "undetermined") {
    await requestNotificationPermission();
  }

  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

async function notify(prayerName, prayerTime) {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const timeToPrayerInSeconds = prayerTimeInSeconds(prayerTime) - currentTimeInSeconds()



  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${prayerName} prayer has started`,
      sound: true
    },
    trigger: {
      seconds: timeToPrayerInSeconds
    },
  });
}

export async function removePreviouslyScheduledNotifications(){
  console.log('removing prev notifications')
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export default async function scheduleNotification(prayerName, prayerTime) {
  const havePermission = await allowsNotificationsAsync();

  if (havePermission) {
    await notify(prayerName, prayerTime);
  }
}

