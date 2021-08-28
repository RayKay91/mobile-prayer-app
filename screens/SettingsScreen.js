import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import AnchorTag from '../components/anchorTag'
import NotificationSwitch from '../components/notificationSwitch'
import getTimes from '../utils/getTimes'
import Constants from 'expo-constants'
const APP_VERSION = Constants.manifest.version

const SettingScreen = () => {
  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Ishaa']

  const handlePress = async () => {
    try {
      await getTimes({ forceRefresh: true })
      Alert.alert(
        'Times refreshed',
        `The times have been manually refreshed. If there still appears to be an error please get in touch with the masjid administration.`
      )
    } catch (error) {
      Alert.alert(
        "Couldn't refresh.",
        'Please check your internet connection and try again.'
      )
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.largeText}>Notifications</Text>
      <Text style={styles.smallText}>
        Toggle the switches to select notifications for prayers.
      </Text>
      {prayers.map((prayer, i) => (
        <NotificationSwitch key={i} idx={i} prayerName={prayer} />
      ))}
      <Text style={styles.largeText}>Options</Text>
      <Text style={styles.smallText}>
        Using the force refresh button can be useful if the times appear to be
        erroneous.
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.settingsOption}>
        <Text style={styles.optionLabel}>Force Refresh</Text>
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 15,
        }}
      >
        <Text style={styles.infoText}>{APP_VERSION}</Text>
        <AnchorTag
          style={{ color: '#A12B6E', textAlign: 'center', fontSize: 13 }}
          url={'https://wise-web.org/privacy-policy/#android-app'}
        >
          Privacy Policy
        </AnchorTag>
        <Text style={styles.infoText}>
          The privacy policy you agree to by using the app
        </Text>
      </View>
    </View>
  )
}

export default SettingScreen
const styles = StyleSheet.create({
  largeText: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
    marginLeft: 11,
  },
  smallText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    paddingHorizontal: 11,
    color: '#4a4a4a',
  },
  settingsOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  optionLabel: {
    fontSize: 18,
    color: '#147EFB',
  },
  infoText: { color: '#999', textAlign: 'center', fontSize: 12 },
})
