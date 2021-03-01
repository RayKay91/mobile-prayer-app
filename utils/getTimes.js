import axios from "axios";
import timeAdjuster from "./timeAdjuster";
import convertTo24Hr from "./24hrConverter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getTimes() {
  const d = new Date();
  const date = d.getDate() + "";

  let savedDate, todaysTimes, tmrwTimes;

  // check if date is the same as last call. If it's a different date,  return fresh times, else return cached times.
  try {
    savedDate = await AsyncStorage.getItem("date");
  } catch (error) {
    console.log(error);
  }

  if (!savedDate || date !== savedDate) {
    // save date to local storage for comparison check
    try {
      await AsyncStorage.setItem("date", date);
    } catch (err) {
        console.log(err);
    }

    const response = await axios.get(
      "https://wise-web.org/wp-json/v2/mobile-app-prayer-times2"
    );

    // add 5 to maghrib time for today jamaa'ah time
    const maghribJam = timeAdjuster(response.data[0][0].Maghrib, 5);
    response.data[0][0].MaghribJam = maghribJam;
    //end

    //add 5 to maghrib time for tomorrow jamaa'ah time
    const tmrwMaghribJam = timeAdjuster(response.data[1][0].Maghrib, 5);
    response.data[1][0].MaghribJam = tmrwMaghribJam;
    //end

    //convert to 24 hrs

    todaysTimes = response.data[0][0];
    tmrwTimes = response.data[1][0];

    const timesToConvert = [
      "Dhuhr",
      "DhuhrJam",
      "Asr",
      "AsrJam",
      "Maghrib",
      "MaghribJam",
      "Ishaa",
      "IshaaJam",
    ];

    for (let time in todaysTimes) {
      if (timesToConvert.includes(time)) {
        const convertedTime = convertTo24Hr(todaysTimes[time]);
        todaysTimes[time] = convertedTime;
      }
    }

    for (let time in tmrwTimes) {
      if (timesToConvert.includes(time)) {
        const convertedTime = convertTo24Hr(tmrwTimes[time]);
        tmrwTimes[time] = convertedTime;
      }
    }

    //saving times to local storage

    (async function saveResponseToLocalStorage() {
      try {
        const todaysPrayerTimes = JSON.stringify(todaysTimes);
        const tmrwsPrayerTimes = JSON.stringify(tmrwTimes);
        await AsyncStorage.setItem("todaysTimes", todaysPrayerTimes);
        await AsyncStorage.setItem("tmrwsTimes", tmrwsPrayerTimes);
      } catch (err) {
        console.log(err);
      }
    })();
    console.log("showing new times");
    return [todaysTimes, tmrwTimes];
  } else {
    async function getTimesFromLocalStorage() {
      try {
        const todaysTimesJSON = await AsyncStorage.getItem("todaysTimes");
        const tmrwsTimesJSON = await AsyncStorage.getItem("tmrwsTimes");
        return [JSON.parse(todaysTimesJSON), JSON.parse(tmrwsTimesJSON)];
      } catch (error) {
        console.log(error);
      }
    }
    console.log("showing saved times");
    return getTimesFromLocalStorage();
  }
}
// getTimes().then(console.log)

