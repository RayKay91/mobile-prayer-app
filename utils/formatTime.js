function formatTime(prayerName, time) {
  //check if hour is 12 or 11 if so do not add 12

  if (time.startsWith('12') || (time.startsWith('11') && prayerName === 'Isha'))
    return time

  if (time.length < 5 && time[0] !== '0') {
    time = '0' + time
  }

  // cancel 24 hour conversion for fajr and sunrise
  if (
    prayerName === 'Fajr' ||
    prayerName === 'FajrJam' ||
    prayerName === 'Sunrise'
  ) {
    return time
  }

  let hours = time.substring(0, 2)

  hours = parseInt(hours) + 12
  return hours + time.substring(2)
}

module.exports = formatTime
