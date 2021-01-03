
const checkZero = require('./checkZero.js')
  


export default function shouldHighlight(fTime, sTime, dTime, aTime, mTime, iTime) {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let sec = date.getSeconds();
    h = checkZero(h);
    m = checkZero(m);
    sec = checkZero(sec);

    
    //concat hour and minute numbers as strings then convert to int
    const currentTime = parseInt(h + "" + m);
    
    //convert strings to numbers using '+' and remove colon for comparisons
    const fajrTime = +fTime.replace(":", "");
    const sunrisetime = +sTime.replace(":", "");
    const dhuhrTime = +dTime.replace(":", "");
    const asrTime = +aTime.replace(":", "");
    const maghribTime = +mTime.replace(":", "");
    const ishaTime = +iTime.replace(":", "");
  
    if (currentTime >= fajrTime && currentTime < sunrisetime) {

          return {fajr: true}

    } else if (currentTime >= sunrisetime && currentTime < dhuhrTime) {

        return {fajr: false, sunrise: true}

    } else if (currentTime >= dhuhrTime && currentTime < asrTime) {

        return {sunrise: false, dhuhr: true}

      
    } else if (currentTime >= asrTime && currentTime < maghribTime) {
      
        return {dhuhr: false, asr: true}


    } else if (currentTime >= maghribTime && currentTime < ishaTime) {
      
        return {asr: false, maghrib: true}


    } else if (currentTime >= ishaTime && currentTime <= 2359) {

        return {maghrib: false, isha: true}
    } else if (!currentTime) {
        return {isha: false}
    }
  }

  
  