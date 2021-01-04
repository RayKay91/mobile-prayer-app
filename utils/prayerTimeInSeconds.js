

function prayerTimeInSeconds(prayerTime){
    const pTimeHour = prayerTime.substring(0,2)
    const pTimeMinute = prayerTime.substring(3)


    const hoursToSeconds = parseInt(pTimeHour) * 3600

    const minutesToSeconds = parseInt(pTimeMinute) * 60

    const pTimeInSeconds = hoursToSeconds + minutesToSeconds


    return pTimeInSeconds
}



module.exports = prayerTimeInSeconds