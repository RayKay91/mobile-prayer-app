const checkZero = require('./checkZero')


function getCurrentTime(){
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = checkZero(h)
    m = checkZero(m)
    s = checkZero(s)

   const time = h + ':' + m + ':' + s

    return time
}

module.exports = getCurrentTime