import React from "react";
import { StyleSheet, View } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
//components
import Row from "./row";
import TableHeader from "./tableHeader";
//util funcs




const Table = ( { prayerTimes, highlight } ) => {

  return (
    <View
      style={ [
        styles.table,
        {
          width: useWindowDimensions().width - 20,
          marginLeft: "auto",
          marginRight: "auto",
        },
      ] }
    >
      <TableHeader />
      <Row
        pTime={ prayerTimes.Fajr }
        jTime={ prayerTimes.FajrJam }
        isHighlighted={ highlight?.fajr }
      >
        Fajr
      </Row>

      <Row
        pTime={ prayerTimes.Sunrise }
        jTime={ "--" }
        isHighlighted={ highlight?.sunrise }

      >
        Sunrise
      </Row>

      <Row
        pTime={ prayerTimes.Dhuhr }
        jTime={ prayerTimes.DhuhrJam }
        isHighlighted={ highlight?.dhuhr }


      >
        Dhuhr
      </Row>

      <Row
        pTime={ prayerTimes.Asr }
        jTime={ prayerTimes.AsrJam }
        isHighlighted={ highlight?.asr }


      >
        Asr
      </Row>

      <Row
        pTime={ prayerTimes.Maghrib }
        jTime={ prayerTimes.MaghribJam }
        isHighlighted={ highlight?.maghrib }


      >
        Maghrib
      </Row>

      <Row
        pTime={ prayerTimes.Ishaa }
        jTime={ prayerTimes.IshaaJam }
        isHighlighted={ highlight?.isha }
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

