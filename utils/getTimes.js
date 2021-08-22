import axios from 'axios'
import timeAdjuster from './timeAdjuster'
import formatTime from './formatTime'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { calculateHijriDate } from './getDate'

export default async function getTimes({ forceRefresh }) {
  const d = new Date()
  const date = d.getDate() + ''

  let savedDate, todaysTimes, tmrwTimes

  // check if date is the same as last call. If it's a different date,  return fresh times, else return cached times.
  try {
    savedDate = await AsyncStorage.getItem('date')
  } catch (error) {}

  if (!savedDate || date !== savedDate || forceRefresh) {
    // save date to local storage for comparison check
    try {
      await AsyncStorage.setItem('date', date)
    } catch (err) {}

    const response = await axios.get(
      'https://wise-web.org/wp-json/v2/mobile-app-prayer-times2'
    )

    const hijriMonth = response.data[2][0].Month
    const adjustment =
      hijriMonth.substring(0, 3).toLowerCase() === 'ram' ? 15 : 5

    // adjust maghrib time for today jamaa'ah time
    const maghribJam = timeAdjuster(response.data[0][0].Maghrib, adjustment)
    response.data[0][0].MaghribJam = maghribJam
    //end

    //adjust maghrib time for tomorrow jamaa'ah time
    const tmrwMaghribJam = timeAdjuster(response.data[1][0].Maghrib, adjustment)
    response.data[1][0].MaghribJam = tmrwMaghribJam
    //end

    //handle '+xx mins' for fajr jamaa'ah

    if (response.data[0][0].FajrJam.substring(0, 1) === '+') {
      const regex = /\d+/g

      const adjustment = parseInt(response.data[0][0].FajrJam.match(regex))
      response.data[0][0].FajrJam = timeAdjuster(
        response.data[0][0].Fajr,
        adjustment
      )

      const adjustmentTmrw = parseInt(response.data[1][0].FajrJam.match(regex))
      response.data[1][0].FajrJam = timeAdjuster(
        response.data[1][0].Fajr,
        adjustmentTmrw
      )
    }

    //format times

    todaysTimes = response.data[0][0]
    tmrwTimes = response.data[1][0]

    const timesToConvert = [
      'Fajr',
      'FajrJam',
      'Sunrise',
      'Dhuhr',
      'DhuhrJam',
      'Asr',
      'AsrJam',
      'Maghrib',
      'MaghribJam',
      'Ishaa',
      'IshaaJam',
    ]

    for (let prayer in todaysTimes) {
      if (timesToConvert.includes(prayer)) {
        const convertedTime = formatTime(prayer, todaysTimes[prayer])
        todaysTimes[prayer] = convertedTime
      }
    }

    for (let prayer in tmrwTimes) {
      if (timesToConvert.includes(prayer)) {
        const convertedTime = formatTime(prayer, tmrwTimes[prayer])
        tmrwTimes[prayer] = convertedTime
      }
    }

    // get hijri date info
    const { Month, Year, StartDate } = response.data[2][0]

    let hijriDate = calculateHijriDate({ Month, Year, StartDate })
    //saving times and hijri date to local storage

    const gregorianDate = response.data[0][0].GregDate

    try {
      const todaysPrayerTimes = JSON.stringify(todaysTimes)
      const tmrwsPrayerTimes = JSON.stringify(tmrwTimes)

      await AsyncStorage.setItem('todaysTimes', todaysPrayerTimes)
      await AsyncStorage.setItem('tmrwsTimes', tmrwsPrayerTimes)
      await AsyncStorage.setItem('hijriDate', hijriDate)
      await AsyncStorage.setItem('gregorianDate', gregorianDate)
    } catch (err) {}
    return [todaysTimes, tmrwTimes, hijriDate]
  } else {
    try {
      const todaysTimesJSON = await AsyncStorage.getItem('todaysTimes')
      const tmrwsTimesJSON = await AsyncStorage.getItem('tmrwsTimes')
      const hijriDate = await AsyncStorage.getItem('hijriDate')

      return [
        JSON.parse(todaysTimesJSON),
        JSON.parse(tmrwsTimesJSON),
        hijriDate,
      ]
    } catch (error) {}
  }
}
