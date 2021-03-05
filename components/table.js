import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import * as Notifications from 'expo-notifications'

//components
import Row from "./row";
import TableHeader from "./tableHeader";
//util funcs
import shouldHighlight from "../utils/shouldHighlight";
import getTimes from "../utils/getTimes";


const Table = ({ refreshing, showTmrwTimes }) => {
  const [pTimes, setPTimes] = useState("--");
  const [tmrwPTimes, setTmrwPTimes] = useState("--");
  const [highlight, setHighlight] = useState({});

  useEffect(() => {
    getTimes()
      .then(async (times) => {
        console.log(
          "\nfetching times on " + Platform.OS + " " + Platform.Version
        );

        const [todaysTimes, tmrwPTimes] = times;
        setPTimes(todaysTimes);        
        setTmrwPTimes(tmrwPTimes);

        const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa } = todaysTimes;
        const prayerTimes = {Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa}

        // highlighting logic
        const willHighlight = shouldHighlight(...Object.values(prayerTimes));

        setHighlight(willHighlight);

         await Notifications.cancelAllScheduledNotificationsAsync()

        }).catch((err) => console.log(`something went wrong ${err}`));
  }, [refreshing]);


  return (
    <View
      style={[
        styles.table,
        {
          width: useWindowDimensions().width - 15,
          marginLeft: "auto",
          marginRight: "auto",
        },
      ]}
    >
      <TableHeader />
      <Row
        pTime={showTmrwTimes ? tmrwPTimes.Fajr : pTimes.Fajr}
        jTime={showTmrwTimes ? tmrwPTimes.FajrJam : pTimes.FajrJam}
        isHighlighted={showTmrwTimes ? false : highlight?.fajr}
      >
        Fajr
      </Row>

      <Row
        pTime={showTmrwTimes ? tmrwPTimes.Sunrise : pTimes.Sunrise}
        jTime={"--"}
        isHighlighted={showTmrwTimes ? false : highlight?.sunrise}
      >
        Sunrise
      </Row>

      <Row
        pTime={showTmrwTimes ? tmrwPTimes.Dhuhr : pTimes.Dhuhr}
        jTime={showTmrwTimes ? tmrwPTimes.DhuhrJam : pTimes.DhuhrJam}
        isHighlighted={showTmrwTimes ? false : highlight?.dhuhr}
      >
        Dhuhr
      </Row>

      <Row
        pTime={showTmrwTimes ? tmrwPTimes.Asr : pTimes.Asr}
        jTime={showTmrwTimes ? tmrwPTimes.AsrJam : pTimes.AsrJam}
        isHighlighted={showTmrwTimes ? false : highlight?.asr}
      >
        Asr
      </Row>

      <Row
        pTime={showTmrwTimes ? tmrwPTimes.Maghrib : pTimes.Maghrib}
        jTime={showTmrwTimes ? tmrwPTimes.MaghribJam : pTimes.MaghribJam}
        isHighlighted={showTmrwTimes ? false : highlight?.maghrib}
      >
        Maghrib
      </Row>

      <Row
        pTime={showTmrwTimes ? tmrwPTimes.Ishaa : pTimes.Ishaa}
        jTime={showTmrwTimes ? tmrwPTimes.IshaaJam : pTimes.IshaaJam}
        isHighlighted={showTmrwTimes ? false : highlight?.isha}
        noBottomBorder
      >
        Ishaa
      </Row>
    </View>
  );
};

export default React.memo(Table);

const styles = StyleSheet.create({
  table: {
    backgroundColor: "#ebecf0",
    borderWidth: 3,
    borderColor: "#333",
    borderRadius: 7,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 4,
  },
});

