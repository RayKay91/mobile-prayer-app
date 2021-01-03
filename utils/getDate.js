// toLocaleString not working on android, so use this function to fetch from API

const axios = require('axios')

 async function getDate(){

    const response = await axios.get('https://wiseprayertimes.herokuapp.com')

    const date = await response.data.date
    
    return date

}


module.exports = getDate