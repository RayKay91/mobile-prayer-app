import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { shouldEnableNotification } from '../redux/notificationsSlice'
import * as Haptics from 'expo-haptics'

const notificationSwitch = ( { prayerName, idx } ) => {

    const notificationStatuses = useSelector( state => state.notifications )
    const dispatch = useDispatch()

    const isEnabled = notificationStatuses[ prayerName ]

    const handleSwitchToggle = async ( shouldEnable ) => {
        await Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light )
        dispatch( shouldEnableNotification( { prayerName, shouldEnable } ) )



    }



    return (
        <View style={ [ styles.container, { borderTopWidth: idx === 0 ? 1 : 0 } ] }>
            <Text style={ styles.switchLabel }>{ prayerName }</Text>
            <Switch
                onValueChange={ handleSwitchToggle }
                trackColor={ { true: 'rgb(161, 43, 110)' } }
                value={ isEnabled }
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
