import AsyncStorage from '@react-native-async-storage/async-storage'
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

async function getDate() {
  const gregorianDateFromApi = await AsyncStorage.getItem('gregorianDate')

  let date = dayjs(gregorianDateFromApi, 'YYYY/MM/DD')
  return {
    today: date.format('dddd D MMMM YYYY'),
    tomorrow: date.add(1, 'd').format('dddd D MMMM YYYY'),
  }
}

function calculateHijriDate({ StartDate, Month, Year }) {
  let currentDate = dayjs().format('YYYY-MM-DD')
  currentDate = dayjs(currentDate)
  let elapsedHijriDays = currentDate.diff(StartDate, 'day')
  //adding 1 to the difference calculated to account for impossibility of 0/mm/yyyy
  elapsedHijriDays += 1

  if (+elapsedHijriDays > 30) return ''

  return `${elapsedHijriDays} ${Month} ${Year} AH`
}

function tmrwHijriDate(currHijriDate) {
  let [date, month, ...year] = currHijriDate.split(' ')

  date = +date + 1

  if (date > 30) return ''

  const dateElements = [date, month, ...year]

  return dateElements.join(' ')
}

module.exports = { getDate, calculateHijriDate, tmrwHijriDate }
