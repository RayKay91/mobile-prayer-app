const dayjs = require('dayjs')

 async function getDate(){

    return dayjs().format('dddd D MMM YYYY')


}







module.exports = getDate