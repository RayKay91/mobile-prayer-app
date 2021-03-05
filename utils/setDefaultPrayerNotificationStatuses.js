import AsyncStorage from '@react-native-async-storage/async-storage'

async function setDefaultPrayerNotificationsStatuses(defaultStatus){

    const status = defaultStatus.toString()

    const fajr = ['Fajr', status]
    const dhuhr = ['Dhuhr', status]
    const asr = ['Asr', status]
    const maghrib = ['Maghrib', status]
    const ishaa = ['Ishaa', status]

    await AsyncStorage.multiSet([fajr, dhuhr, asr, maghrib, ishaa])

}

module.exports = setDefaultPrayerNotificationsStatuses