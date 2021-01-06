const axios = require('axios')

export default async function getTimes(){

    const response = await axios.get('https://wiseprayertimes.herokuapp.com/getPrayerTimes')

    const times = [response.data.prayerTimes, response.data.jamaaTimes]


    return times
}
