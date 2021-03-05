import React, {useState} from 'react'
import { StyleSheet, Text, View , Switch} from 'react-native'
import * as Haptics from 'expo-haptics'
import AsyncStorage from "@react-native-async-storage/async-storage";
import scheduleNotification from '../utils/notifications'
import * as Notifications from 'expo-notifications'

const notificationSwitch = ({prayerName, idx}) => {

    const [isEnabled, setIsEnabled] = useState(true)

    const handleSwitchToggle = async (shouldEnable) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setIsEnabled(shouldEnable)

        // await AsyncStorage.setItem(prayerName, shouldEnable.toString())
        // const id = await AsyncStorage.getItem(`${prayerName}NotificationID`)
        // await Notifications.cancelScheduledNotificationAsync(id)
        
        // if(shouldEnable){
        //     const pTime = await AsyncStorage.getItem('todaysTimes')
        //     const prayerTime = JSON.parse(pTime);
        //     scheduleNotification(prayerName, prayerTime[prayerName])
        // }

    }

    return (
        <View style={[styles.container, {borderTopWidth: idx === 0 ? 1 : 0}]}>
            <Text style={styles.switchLabel}>{prayerName}</Text>
            <Switch
                onValueChange={handleSwitchToggle}
                trackColor={{true: 'rgb(161, 43, 110)'}}
                value={isEnabled}
            />
        </View>
    )
}

export default notificationSwitch

const styles = StyleSheet.create({
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
})
