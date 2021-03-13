import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import getTimes from './getTimes'
import scheduleNotification from './notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'


// SHOULD CHANGE THE MINIMUM INTERVAL TO 3600 FOR HOURLY FETCHES

async function backgroundFetchAndSetNotifications() {
    //get new times. This function will also save the new times to local storage
    const dateFromLocalStorage = await AsyncStorage.getItem( 'date' )
    const currentDate = new Date().getDate()

    if ( currentDate.toString() !== dateFromLocalStorage ) {
        await getTimes()
        //get the notification statuses
        const stateRaw = await AsyncStorage.getItem( 'persist:root' )
        const state = JSON.parse( stateRaw )
        const { notifications } = state
        const allowsNotifications = JSON.parse( notifications )
        //loop over statuses and schedule notifications for the ones that allow so

        for ( let prayer in allowsNotifications ) {
            //if allows notifications:
            console.log( 'backgroundFetch running and setting notifications ' + Platform.OS )
            if ( allowsNotifications[ prayer ] )
                scheduleNotification( prayer )
        }
    }

    // return a new string every time the function is run to make iOS think something new has been returned
    return ( Math.random().toString() )

}



export default async function backgroundFetch() {
    const permission = await BackgroundFetch.getStatusAsync()
    if ( permission === BackgroundFetch.Status.Available )

        try {

            await TaskManager.defineTask( 'fetchTimesAndSetNotifications', async () => {
                try {
                    const newData = await backgroundFetchAndSetNotifications()
                    return newData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData
                } catch ( err ) {
                    console.log( err );

                    return BackgroundFetch.Result.Failed
                }
            } )

            await BackgroundFetch.registerTaskAsync( 'fetchTimesAndSetNotifications', { stopOnTerminate: false, startOnBoot: true, minimumInterval: 3600 } )

        } catch ( error ) {
            console.log( error );
        }

}
