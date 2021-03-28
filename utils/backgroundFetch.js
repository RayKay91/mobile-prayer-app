import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import getTimes from './getTimes'
import scheduleNotification from './notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'


async function backgroundFetchAndSetNotifications() {
    //get new times. This function will also save the new times to local storage
    const dateFromLocalStorage = await AsyncStorage.getItem( 'date' )
    const d = new Date()
    const currentDate = d.getDate()

    if ( currentDate.toString() !== dateFromLocalStorage ) {
        console.log( `Running background task on ${ Platform.OS } at ${ d.getHours() }:${ d.getMinutes() }:${ d.getSeconds() }` )
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
        return 'currentDate'
    }


}



export default async function backgroundFetch() {
    const permission = await BackgroundFetch.getStatusAsync()
    if ( permission === BackgroundFetch.Status.Available ) {

        console.log( await TaskManager.getRegisteredTasksAsync() )

        try {

            await TaskManager.defineTask( 'fetchTimesAndSetNotifications', async () => {
                try {
                    const newData = await backgroundFetchAndSetNotifications()
                    return newData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData
                } catch ( err ) {
                    console.log( 'error in defining backgroundtask', err );

                    return BackgroundFetch.Result.Failed
                }
            } )

            await BackgroundFetch.registerTaskAsync( 'fetchTimesAndSetNotifications', { stopOnTerminate: false, startOnBoot: true, minimumInterval: 3600 } )

        } catch ( error ) {
            console.log( error );
        }
    }

}
