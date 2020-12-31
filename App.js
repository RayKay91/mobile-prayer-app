import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Row from './components/row'


export default function App() {

  const date = new Date()

  const [pTime, setPTime] = useState('--')
  const [jTime, setJTime] = useState('--')
  const [highlight, setHighlight] = useState(false)

  return (
    <View style={ styles.container }>
     
      <Text style={{ fontSize:30, marginTop:75, marginBottom: 50, color: '#444', fontWeight:'bold' }}>{ date.toDateString() }</Text>
      
      
      <Row jTime="Jamah"></Row>
      <Row 
        pTime={pTime}
        jTime={jTime}
        isHighlighted={highlight}

      >Fajr</Row>
      
      <Row 
        pTime={pTime}
        jTime={jTime}
        isHighlighted={highlight}
      >Sunrise</Row>
      
      <Row 
        pTime={pTime}
        jTime={jTime}
        isHighlighted={highlight}
      >Dhuhr</Row>
      
      <Row 
        pTime={pTime}
        jTime={jTime}
        isHighlighted={highlight}
      >Asr</Row>

      <Row 
        pTime={pTime}
        jTime={jTime}
        isHighlighted={highlight}
      >Maghrib</Row>
      
      <Row
        pTime={pTime}
        jTime={jTime}
        isHighlighted={highlight}
        >Isha</Row>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecf0',
    alignItems: 'center',
    padding: 50
  },
});

