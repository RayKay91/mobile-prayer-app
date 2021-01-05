const dayjs = require('dayjs')
const hijriJs = require('hijri-js')


function getDate(){
    const gregorianDate = dayjs().format('dddd D MMM YYYY')

    const hijri = hijriJs.initialize()

    const hijriDate = hijri.today().full

    return {gregorianDate, hijriDate}

}







module.exports = getDate