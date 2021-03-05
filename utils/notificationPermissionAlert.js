import {notificationPermission} from './notifications'
import setDefaultPrayerNotificationStatuses from './setDefaultPrayerNotificationStatuses'

function notificationPermissionAlert(){
    Alert.alert(
    'Prayer Notifications',
    'Would you like to be notified of prayer times?',
    [
      {
        text: 'Notify me',
        onPress: async () => {
  
          const allowsNotifications = await notificationPermission()
          
          if(allowsNotifications){
            try {
              await setDefaultPrayerNotificationStatuses(true)
  
            } catch (error) {
              console.log(error);
            }
          } else {
            await setDefaultPrayerNotificationStatuses(false)
  
          }
        }
      },
      {
        text: 'No',
        onPress: async () => {
          try {
            await setDefaultPrayerNotificationStatuses(false)
          } catch (error) {
            console.log(error);
          }
  
        },
        style: 'cancel'
      },
    ],
    { cancelable: false }
    );}

module.exports = notificationPermissionAlert