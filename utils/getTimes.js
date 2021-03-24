import axios from "axios";
import timeAdjuster from "./timeAdjuster";
import formatTime from "./formatTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateHijriDate } from './getDate'

export default async function getTimes() {
  const d = new Date();
  const date = d.getDate() + "";

  let savedDate, todaysTimes, tmrwTimes;

  // check if date is the same as last call. If it's a different date,  return fresh times, else return cached times.
  try {
    savedDate = await AsyncStorage.getItem( "date" );
  } catch ( error ) {
    console.log( error );
  }

  if ( !savedDate || date !== savedDate ) {
    // save date to local storage for comparison check
    try {
      await AsyncStorage.setItem( "date", date );
    } catch ( err ) {
      console.log( err );
    }

    const response = await axios.get(
      "https://wise-web.org/wp-json/v2/mobile-app-prayer-times2"
    );

    // add 5 to maghrib time for today jamaa'ah time
    const maghribJam = timeAdjuster( response.data[ 0 ][ 0 ].Maghrib, 5 );
    response.data[ 0 ][ 0 ].MaghribJam = maghribJam;
    //end

    //add 5 to maghrib time for tomorrow jamaa'ah time
    const tmrwMaghribJam = timeAdjuster( response.data[ 1 ][ 0 ].Maghrib, 5 );
    response.data[ 1 ][ 0 ].MaghribJam = tmrwMaghribJam;
    //end

    //add zero if not present in times



    //format times

    todaysTimes = response.data[ 0 ][ 0 ];
    tmrwTimes = response.data[ 1 ][ 0 ];

    const timesToConvert = [
      "Fajr",
      'FajrJam',
      'Sunrise',
      "Dhuhr",
      "DhuhrJam",
      "Asr",
      "AsrJam",
      "Maghrib",
      "MaghribJam",
      "Ishaa",
      "IshaaJam",
    ];

    for ( let prayer in todaysTimes ) {
      if ( timesToConvert.includes( prayer ) ) {
        const convertedTime = formatTime( prayer, todaysTimes[ prayer ] );
        todaysTimes[ prayer ] = convertedTime;
      }
    }

    for ( let prayer in tmrwTimes ) {
      if ( timesToConvert.includes( prayer ) ) {
        const convertedTime = formatTime( prayer, tmrwTimes[ prayer ] );
        tmrwTimes[ prayer ] = convertedTime;
      }
    }

    // get hijri date info
    const { Month, Year, StartDate } = response.data[ 2 ][ 0 ]

    let hijriDate = calculateHijriDate( { Month, Year, StartDate } )
    //saving times and hijri date to local storage


    try {
      const todaysPrayerTimes = JSON.stringify( todaysTimes );
      const tmrwsPrayerTimes = JSON.stringify( tmrwTimes );

      await AsyncStorage.setItem( "todaysTimes", todaysPrayerTimes );
      await AsyncStorage.setItem( "tmrwsTimes", tmrwsPrayerTimes );
      await AsyncStorage.setItem( "hijriDate", hijriDate )
    } catch ( err ) {
      console.log( err );
    }
    ;

    return [ todaysTimes, tmrwTimes, hijriDate ];

  } else {

    try {
      const todaysTimesJSON = await AsyncStorage.getItem( "todaysTimes" );
      const tmrwsTimesJSON = await AsyncStorage.getItem( "tmrwsTimes" );
      const hijriDate = await AsyncStorage.getItem( 'hijriDate' )

      return [ JSON.parse( todaysTimesJSON ), JSON.parse( tmrwsTimesJSON ), hijriDate ];
    } catch ( error ) {
      console.log( error );
    }
  }

}



