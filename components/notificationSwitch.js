import React from 'react'
import { StyleSheet, Text, View, Switch, Platform, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { shouldEnableNotification } from '../redux/notificationsSlice'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import scheduleNotification from '../utils/notifications'

const notificationSwitch = ( { prayerName, idx } ) => {

    const notificationStatuses = useSelector( state => state.notifications )
    const notificationIDs = useSelector( state => state.notificationIDs )
    const dispatch = useDispatch()
    const isEnabled = notificationStatuses[ prayerName ]





    const handleSwitchToggle = async ( shouldEnable ) => {
        if ( Platform.OS === 'ios' ) {
            await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light )
        }
        dispatch( shouldEnableNotification( { prayerName, shouldEnable } ) )
        //cancel scheduled notification in case user doesn't navigate back to home screen.

        if ( !shouldEnable ) {
            const pNameNotification = `${ prayerName }Notification`
            const notificationID = notificationIDs[ pNameNotification ]
            try {
                if ( notificationID ) {
                    await Notifications.cancelScheduledNotificationAsync( notificationID )

                }
            } catch ( error ) {

            }

            //remove tomorrow's scheduled notification for fajr
            if ( prayerName === 'Fajr' ) {
                try {
                    dispatch( shouldEnableNotification( { prayerName: 'tmrwFajr', shouldEnable } ) )

                } catch ( error ) {

                }

                const tmrwFajrNotificationID = notificationIDs.tmrwFajrNotification
                await Notifications.cancelScheduledNotificationAsync( tmrwFajrNotificationID )

            }
            if ( Platform.OS === 'android' ) ToastAndroid.showWithGravityAndOffset( `You will not be notified for ${ prayerName } prayers`, ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0, 600,
                0 )
        }
        if ( shouldEnable ) {
            try {

                dispatch( shouldEnableNotification( { prayerName: 'tmrwFajr', shouldEnable } ) )
                await scheduleNotification( prayerName )

                if ( prayerName === 'Fajr' ) await scheduleNotification( 'tmrwFajr' )
            } catch ( error ) {

            }
            if ( Platform.OS === 'android' ) ToastAndroid.showWithGravityAndOffset( `You will be notified for ${ prayerName } prayers`, ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0, 600,
                0 )
        }

    }



    return (
        <View style={ [ styles.container, { borderTopWidth: idx === 0 ? 1 : 0 } ] }>
            <Text style={ styles.switchLabel }>{ prayerName }</Text>
            <Switch
                onValueChange={ handleSwitchToggle }
                trackColor={ { true: 'rgb(161, 43, 110)' } }
                value={ isEnabled }
                thumbColor={ Platform.OS === 'android' ? '#f5f5f5' : undefined }
            />
        </View>
    )
}

export default notificationSwitch

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
        alignItems: 'center',
        backgroundColor: 'white'


    },
    switchLabel: {
        fontSize: 19,
    }
} )
