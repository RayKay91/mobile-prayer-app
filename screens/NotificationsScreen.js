import React from 'react'
import { View, Text } from 'react-native'
import NotificationSwitch from '../components/notificationSwitch'
const NotificationsScreen = () => {
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Ishaa']
    return (
        <View>
        <Text style={{marginTop: 30, marginBottom: 15, fontSize: 14, paddingHorizontal: 15, color: '#4a4a4a'}}>Toggle the switches to select notifications for prayers.</Text>
            {prayers.map((prayer, i) => <NotificationSwitch key={i} idx={i} prayerName={prayer} />)}
        </View>
    )
}

export default NotificationsScreen
