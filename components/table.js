import React, {useState, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import Row from './row'
import TableHeader from './tableHeader'
import shouldHighlight from '../utils/shouldHighlight'
import getTimes from '../utils/getTimes'

const Table = ({refreshing}) => {

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

    
        })
        .catch(err => console.log(`something went wrong ${err}`))
      // }
    
      }, [refreshing])
    

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
    zIndex:1,
    shadowColor: "black",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    }
})
