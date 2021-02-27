import React, {useState, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
//components
import Row from './row'
import TableHeader from './tableHeader'
//util funcs
import shouldHighlight from '../utils/shouldHighlight'
import getTimes from '../utils/getTimes'
import scheduleNotification, {removePreviouslyScheduledNotifications} from '../utils/notifications'
import currentTime from '../utils/currentTime'
import convertTo24Hr from '../utils/24hrConverter'


const Table = ({refreshing, notifications}) => {

    const [pTimes, setPTimes] = useState('--')
    const [tmrwPTimes, setTmrwPTimes] = useState('--')
    const [highlight, setHighlight] = useState({})




    useEffect( () => {

      getTimes().then(times => {

        console.log('fetching times');
          const [todaysTimes, tmrwPTimes] = times
          setPTimes(todaysTimes)
          setTmrwPTimes(tmrwPTimes)

          // notification & highlighting logic
          const {Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa} = todaysTimes

          const prayerTimes = [Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa]

          const willHighlight = shouldHighlight(Fajr, Sunrise, Dhuhr, Asr, Maghrib, Ishaa)
  
          setHighlight(willHighlight)

          removePreviouslyScheduledNotifications()

          if (notifications) { 
            
            let {timeWithoutSeconds:currTime} = currentTime()
            currTime = +currTime.replace(":", "")

            prayerTimes.forEach((time, i) => {
              if (i === 1) return

              const prayerTime = convertTo24Hr(time)
              let pName = ''

              switch (i) {
                case 0:
                  pName = 'Fajr';
                  break;
                case 2:
                  pName = 'Dhuhr';
                  break;
                case 3:
                  pName = 'Asr';
                  break;
                case 4:
                  pName = 'Maghrib';
                  break;
                case 5:
                  pName = 'Ishaa';
                  break;
              }
              if (currTime < prayerTime){
                scheduleNotification(pName, time)
              }
            })
          }
      })
        .catch(err => console.log(`something went wrong ${err}`))
      }, [refreshing, notifications])
    

    return (

      <View style={styles.table}>
        <TableHeader/>
      <Row 
        pTime={pTimes?.Fajr}
        jTime={pTimes?.FajrJam}
        isHighlighted={highlight?.fajr}

      >Fajr</Row>
      
      <Row 
        pTime={pTimes?.Sunrise}
        jTime={'--'}
        isHighlighted={highlight?.sunrise}
      >Sunrise</Row>
      
      <Row 
        pTime={pTimes?.Dhuhr}
        jTime={pTimes?.DhuhrJam}
        isHighlighted={highlight?.dhuhr}
      >Dhuhr</Row>
      
      <Row 
        pTime={pTimes?.Asr}
        jTime={pTimes?.AsrJam}
        isHighlighted={highlight?.asr}
      >Asr</Row>

      <Row 
        pTime={pTimes?.Maghrib}
        jTime={pTimes?.MaghribJam}
        isHighlighted={highlight?.maghrib}
      >Maghrib</Row>
      
      <Row
        pTime={pTimes?.Ishaa}
        jTime={pTimes?.IshaaJam}
        isHighlighted={highlight?.isha}
        noBottomBorder
        >Isha</Row>
        


    </View>
    )
}

export default React.memo(Table)

const styles = StyleSheet.create({
  table : {
    backgroundColor: '#ebecf0' ,
    borderWidth: 3,
    borderColor: '#333',
    borderRadius: 7,
    shadowColor: "black",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 4
    }
})
