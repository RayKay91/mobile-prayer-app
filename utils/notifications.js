import * as Notifications from "expo-notifications";
const currentTimeInSeconds = require('./currentTimeInSeconds')
const prayerTimeInSeconds = require('./prayerTimeInSeconds')


async function requestNotificationPermission() {
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
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

  const timeToPrayerInSeconds = prayerTimeInSeconds(prayerTime) - currentTimeInSeconds()

  console.log(timeToPrayerInSeconds)


  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${prayerName} prayer has started`,
      body: `It's time for ${prayerName}`,
    },
    trigger: {
      seconds: timeToPrayerInSeconds
    },
  });

  console.log(notificationId, 'notifying for ' + prayerName, ' in ' + timeToPrayerInSeconds + ' seconds');
}

export async function removePreviouslyScheduledNotifications(){
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export default async function scheduleNotification(prayerName, prayerTime) {
  const havePermission = await allowsNotificationsAsync();

  if (havePermission) {
    
    notify(prayerName, prayerTime);
  }
}

