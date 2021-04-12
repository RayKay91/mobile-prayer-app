import React from "react";
import { StyleSheet, View } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
//components
import Row from "./row";
import TableHeader from "./tableHeader";
//util funcs




const Table = ( { prayerTimes, highlight, tmrwsTimes } ) => {

  return (
    <View
      style={ [
        styles.table,
        {
          width: useWindowDimensions().width - 20,
        },
      ] }
    >
      <TableHeader />
      <Row
        pTime={ prayerTimes?.Fajr || tmrwsTimes?.Fajr }
        jTime={ prayerTimes?.FajrJam || tmrwsTimes?.FajrJam }
        isHighlighted={ tmrwsTimes ? false : highlight?.fajr }
      >
        Fajr
      </Row>

      <Row
        pTime={ prayerTimes?.Sunrise || tmrwsTimes?.Sunrise }
        jTime={ "--" }
        isHighlighted={ tmrwsTimes ? false : highlight?.sunrise }

      >
        Sunrise
      </Row>

      <Row
        pTime={ prayerTimes?.Dhuhr || tmrwsTimes?.Dhuhr }
        jTime={ prayerTimes?.DhuhrJam || tmrwsTimes?.DhuhrJam }
        isHighlighted={ tmrwsTimes ? false : highlight?.dhuhr }


      >
        Dhuhr
      </Row>

      <Row
        pTime={ prayerTimes?.Asr || tmrwsTimes?.Asr }
        jTime={ prayerTimes?.AsrJam || tmrwsTimes?.AsrJam }
        isHighlighted={ tmrwsTimes ? false : highlight?.asr }


      >
        Asr
      </Row>

      <Row
        pTime={ prayerTimes?.Maghrib || tmrwsTimes?.Maghrib }
        jTime={ prayerTimes?.MaghribJam || tmrwsTimes?.MaghribJam }
        isHighlighted={ tmrwsTimes ? false : highlight?.maghrib }


      >
        Maghrib
      </Row>

      <Row
        pTime={ prayerTimes?.Ishaa || tmrwsTimes?.Ishaa }
        jTime={ prayerTimes?.IshaaJam || tmrwsTimes?.IshaaJam }
        isHighlighted={ tmrwsTimes ? false : highlight?.isha }
        borderBottomRadius={ 4 }
        noBottomBorder


      >
        Ishaa
      </Row>
    </View>
  );
};

export default Table

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

