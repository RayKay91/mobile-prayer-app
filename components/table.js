import React, {useState, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import Row from './row'
import TableHeader from './tableHeader'
import shouldHighlight from '../utils/shouldHighlight'
import getTimes from '../utils/getTimes'
import scheduleNotification, {removePreviouslyScheduledNotifications} from '../utils/notifications'
import currentTime from '../utils/currentTime'


const Table = ({refreshing, notifications}) => {

    const [pTimes, setPTimes] = useState('--')
    const [jTimes, setJTimes] = useState('--')
    const [highlight, setHighlight] = useState({})




    useEffect( () => {
        
      getTimes().then(times => {

          const [prayerTimes, jamaaTimes] = times
          setPTimes(prayerTimes)
          setJTimes(jamaaTimes)
    
          const {fajr, sunrise, dhuhr, asr, maghrib, isha} = prayerTimes

          const willHighlight = shouldHighlight(fajr, sunrise, dhuhr, asr, maghrib, isha)
    
          setHighlight(willHighlight)

          removePreviouslyScheduledNotifications()

          if (notifications) { 
            
            let {timeWithoutSeconds} = currentTime()
            timeWithoutSeconds = +timeWithoutSeconds.replace(":", "")
            
            Object.entries(prayerTimes).map(([pName, pTime]) => {
              
              const prayerTime = +pTime.replace(":", "");
              
              if (pName !== 'sunrise' && timeWithoutSeconds < prayerTime){
                scheduleNotification(pName, pTime)
              }
            })
          }
      })
        .catch(err => console.log(`something went wrong ${err}`))
      }, [refreshing, notifications])
    

    return (

      <View>
      <View style={styles.table}>
        <TableHeader/>
      <Row 
        pTime={pTimes.fajr}
        jTime={jTimes.fajrJamaa}
        isHighlighted={highlight?.fajr}

      >Fajr</Row>
      
      <Row 
        pTime={pTimes.sunrise}
        jTime={'--'}
        isHighlighted={highlight?.sunrise}
      >Sunrise</Row>
      
      <Row 
        pTime={pTimes.dhuhr}
        jTime={jTimes.dhuhrJamaa}
        isHighlighted={highlight?.dhuhr}
      >Dhuhr</Row>
      
      <Row 
        pTime={pTimes.asr}
        jTime={jTimes.asrJamaa}
        isHighlighted={highlight?.asr}
      >Asr</Row>

      <Row 
        pTime={pTimes.maghrib}
        jTime={jTimes.maghribJamaa}
        isHighlighted={highlight?.maghrib}
      >Maghrib</Row>
      
      <Row
        pTime={pTimes.isha}
        jTime={jTimes.ishaJamaa}
        isHighlighted={highlight?.isha}
        noBottomBorder
        >Isha</Row>
        


    </View>

    

</View>
    )
}

export default Table

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
    shadowRadius: 5,
    elevation: 4
    }
})
