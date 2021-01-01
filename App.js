import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Row from './components/row'
import TableHeader from './components/tableHeader'
import axios from 'axios'
import showDate from './utils/showDate'
import shouldHighlight from './utils/shouldHighlight'


export default function App() {


  const [pTimes, setPTimes] = useState('--')
  const [jTimes, setJTimes] = useState('--')
  const [highlight, setHighlight] = useState({})
 

  useEffect( () => {

    axios.get('https://wiseprayertimes.herokuapp.com')
    .then( response =>  response.data)
    .then(times => {
      setPTimes(times.prayerTimes) 
      setJTimes(times.jamaaTimes) 

      const {fajr, sunrise, dhuhr, asr, maghrib, isha} = times.prayerTimes
      
      const willHighlight = shouldHighlight(fajr, sunrise, dhuhr, asr, maghrib, isha)
      console.log(willHighlight)

      setHighlight(willHighlight)


    })
    .catch(err => console.log(`something went wrong ${err}`))

  },[])

  return (
    <View style={ styles.container }>
     
      <Text style={{ fontSize:30, marginTop:75, marginBottom: 50, color: '#444', fontWeight:'bold' }}>{showDate()}</Text>
      
      
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
        >Isha</Row>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecf0',
    alignItems: 'center',
    paddingHorizontal: 15 
  },
});

