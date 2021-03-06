import React from "react";
import { StyleSheet, View } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
//components
import Row from "./row";
import TableHeader from "./tableHeader";
//util funcs




const Table = ( { prayerTimes, tmrwsTimes, showTmrwTimes, highlight } ) => {

  return (
    <View
      style={ [
        styles.table,
        {
          width: useWindowDimensions().width - 15,
          marginLeft: "auto",
          marginRight: "auto",
        },
      ] }
    >
      <TableHeader />
      <Row
        pTime={ showTmrwTimes ? tmrwsTimes.Fajr : prayerTimes.Fajr }
        jTime={ showTmrwTimes ? tmrwsTimes.FajrJam : prayerTimes.FajrJam }
        isHighlighted={ showTmrwTimes ? false : highlight?.fajr }
      >
        Fajr
      </Row>

      <Row
        pTime={ showTmrwTimes ? tmrwsTimes.Sunrise : prayerTimes.Sunrise }
        jTime={ "--" }
        isHighlighted={ showTmrwTimes ? false : highlight?.sunrise }
      >
        Sunrise
      </Row>

      <Row
        pTime={ showTmrwTimes ? tmrwsTimes.Dhuhr : prayerTimes.Dhuhr }
        jTime={ showTmrwTimes ? tmrwsTimes.DhuhrJam : prayerTimes.DhuhrJam }
        isHighlighted={ showTmrwTimes ? false : highlight?.dhuhr }
      >
        Dhuhr
      </Row>

      <Row
        pTime={ showTmrwTimes ? tmrwsTimes.Asr : prayerTimes.Asr }
        jTime={ showTmrwTimes ? tmrwsTimes.AsrJam : prayerTimes.AsrJam }
        isHighlighted={ showTmrwTimes ? false : highlight?.asr }
      >
        Asr
      </Row>

      <Row
        pTime={ showTmrwTimes ? tmrwsTimes.Maghrib : prayerTimes.Maghrib }
        jTime={ showTmrwTimes ? tmrwsTimes.MaghribJam : prayerTimes.MaghribJam }
        isHighlighted={ showTmrwTimes ? false : highlight?.maghrib }
      >
        Maghrib
      </Row>

      <Row
        pTime={ showTmrwTimes ? tmrwsTimes.Ishaa : prayerTimes.Ishaa }
        jTime={ showTmrwTimes ? tmrwsTimes.IshaaJam : prayerTimes.IshaaJam }
        isHighlighted={ showTmrwTimes ? false : highlight?.isha }
        noBottomBorder
      >
        Ishaa
      </Row>
    </View>
  );
};

export default React.memo( Table );

const styles = StyleSheet.create( {
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
} );

