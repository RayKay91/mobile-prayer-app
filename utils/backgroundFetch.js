import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import getTimes from './getTimes'
import scheduleNotification from './notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import Bugsnag from '@bugsnag/expo'


async function backgroundFetchAndSetNotifications() {
    //get new times. This function will also save the new times to local storage
    const dateFromLocalStorage = await AsyncStorage.getItem( 'date' )
    const d = new Date()
    const currentDate = d.getDate()
    Bugsnag.notify( 'backgroundFetch launched' )
    if ( currentDate.toString() !== dateFromLocalStorage ) {
        Bugsnag.notify( 'new times being fetched in background' )
        await getTimes()
        //get the notification statuses
        let state = await AsyncStorage.getItem( 'persist:root' )
        state = JSON.parse( state )
        const { notifications } = state
        const allowsNotifications = JSON.parse( notifications )

        //remove prev notifications to avoid multiple notifications
        await Notifications.cancelAllScheduledNotificationsAsync()
        //loop over statuses and schedule notifications for the ones that allow so

        for ( let prayer in allowsNotifications ) {

            //if allows notifications:
            if ( allowsNotifications[ prayer ] )
                scheduleNotification( prayer )
        }
        return currentdate
    }
    return currentdate
}



export default async function backgroundFetch() {
    const permission = await BackgroundFetch.getStatusAsync()
    if ( permission === BackgroundFetch.Status.Available ) {

        try {

            await TaskManager.defineTask( 'fetchTimesAndSetNotifications', async () => {
                try {
                    const newData = await backgroundFetchAndSetNotifications()
                    return newData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData
                } catch ( err ) {
                    return BackgroundFetch.Result.Failed
                }
            } )

            await BackgroundFetch.registerTaskAsync( 'fetchTimesAndSetNotifications', { stopOnTerminate: false, startOnBoot: true, minimumInterval: 3600 } )

        } catch ( error ) {
            Bugsnag.notify( 'error registering background task' )
        }
    }

}
