import React from 'react'
import { View, Text } from 'react-native'
import NotificationSwitch from '../components/notificationSwitch'
const NotificationsScreen = ({route}) => {
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Ishaa']
    return (
        <View>
            <Text>{JSON.stringify(route)}</Text>
            {prayers.map((prayer, i) => <NotificationSwitch key={i} prayerName={prayer} />)}
        </View>
    )
}

export default NotificationsScreen
