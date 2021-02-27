const axios = require('axios')
const timeAdjuster = require('./timeAdjuster')

export default async function getTimes(){

    const response = await axios.get('https://wise-web.org/wp-json/v2/mobile-app-prayer-times2')

    const todaysTimes = response.data[0][0]
    const tmrwTimes = response.data[1][0]
    // add 5 to maghrib time for today jamaa'ah time
    const maghribJam = timeAdjuster(response.data[0][0].Maghrib, 5)
    response.data[0][0].MaghribJam = maghribJam
    //end

    //add 5 to maghrib time for tomorrow jamaa'ah time
    const tmrwMaghribJam = timeAdjuster(response.data[1][0].Maghrib, 5)
    response.data[1][0].MaghribJam = tmrwMaghribJam
    //end
    const times = [todaysTimes, tmrwTimes]


    return times
}
