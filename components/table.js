import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
//components
import Row from "./row";
import TableHeader from "./tableHeader";
//util funcs
import shouldHighlight from "../utils/shouldHighlight";
import getTimes from "../utils/getTimes";
import scheduleNotification, {
  removePreviouslyScheduledNotifications,
} from "../utils/notifications";
import currentTime from "../utils/currentTime";

const Table = ({ refreshing, notifications, showTmrwTimes }) => {
  const [pTimes, setPTimes] = useState("--");
  const [tmrwPTimes, setTmrwPTimes] = useState("--");
  const [highlight, setHighlight] = useState({});

  useEffect(() => {
    getTimes()
      .then((times) => {
        console.log(
          "\nfetching times on " + Platform.OS + " " + Platform.Version
        );

        const [todaysTimes, tmrwPTimes] = times;
        setPTimes(todaysTimes);
        console.log('setting state today' + pTimes === '--' ? ' noTimes' : 'Times added')
        console.log('setting state tomorrow')
        
        setTmrwPTimes(tmrwPTimes);

        console.log('setting state tomorrow' + tmrwPTimes === '--' ? ' noTimes' : 'Times added')

        const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa } = todaysTimes;
        const prayerTimes = [Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa];
        // highlighting logic
        const willHighlight = shouldHighlight(...prayerTimes);
        
        console.log('setting higlights')
        setHighlight(willHighlight);
          console.log('removing previous notifications')

        removePreviouslyScheduledNotifications();

        if (notifications) {
          console.log('running notification if block');
          let { timeWithoutSeconds: currTime } = currentTime();
          currTime = +currTime.replace(":", "");

          prayerTimes.forEach((pTimeStr, i) => {
            if (i === 1) return;

            let pName = "";

            switch (i) {
              case 0:
                pName = "Fajr";
                break;
              case 2:
                pName = "Dhuhr";
                break;
              case 3:
                pName = "Asr";
                break;
              case 4:
                pName = "Maghrib";
                break;
              case 5:
                pName = "Ishaa";
                break;
            }

            const pTime = +pTimeStr.replace(":", "");

            if (currTime < pTime) {
              console.log('Table.js schedule function firing for ' + pName);
              scheduleNotification(pName, pTimeStr);
            }
          });
        }
      })
      .catch((err) => console.log(`something went wrong ${err}`));
  }, [refreshing, notifications]);

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

