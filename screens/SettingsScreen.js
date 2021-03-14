import React from 'react'
import { View, Text } from 'react-native'
import AnchorTag from '../components/anchorTag'
import NotificationSwitch from '../components/notificationSwitch'

const SettingScreen = () => {
    const prayers = [ 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Ishaa' ]
    return (
        <View style={ { flex: 1 } }>
            <Text style={ { marginTop: 30, fontWeight: 'bold', fontSize: 22, color: '#333', marginLeft: 11 } }>Notifications</Text>
            <Text style={ { marginTop: 5, marginBottom: 10, fontSize: 14, paddingHorizontal: 11, color: '#4a4a4a' } }>Toggle the switches to select notifications for prayers.</Text>
            {prayers.map( ( prayer, i ) => <NotificationSwitch key={ i } idx={ i } prayerName={ prayer } /> ) }
            <View style={ { marginLeft: 30, marginRight: 30, justifyContent: 'center', position: 'absolute', bottom: 15 } }>
                <AnchorTag style={ { color: '#A12B6E', textAlign: 'center' } } url={ 'https://wise-web.org/privacy-policy/#android-app' }>Privacy Policy</AnchorTag>
                <Text style={ { color: '#999', textAlign: 'center' } }>The privacy policy you agree to by using the app</Text>
            </View>
        </View>
    )
}

export default SettingScreen
