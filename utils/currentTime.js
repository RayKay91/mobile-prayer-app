const checkZero = require('./checkZero')

//returns time in hhmm / hhmmss format

function getCurrentTime(){
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = checkZero(h)
    m = checkZero(m)
    s = checkZero(s)

   const timeWithSeconds = h + ':' + m + ':' + s
   const timeWithoutSeconds = h + ':' + m

    return {timeWithSeconds, timeWithoutSeconds}
}

module.exports = getCurrentTime