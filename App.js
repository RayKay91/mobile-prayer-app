import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import showDate from './utils/showDate'
import Table from './components/table'
import Tweets from './components/tweets'



export default function App() {

  

  return (
    <View style={ styles.container }>

    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
     
      <Text style={styles.date}>{showDate()}</Text>

      <Table/>

      <Text style={styles.subHeading}>Latest Tweets and Announcements</Text>

      <Tweets/>
      </ScrollView>
    </View>
      
      
      


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecf0',
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: 800
  },
  date: {
     fontSize:30, 
     marginTop:75, 
     marginBottom: 50, 
     color: '#444', 
     fontWeight:'bold', 
     textAlign: 'center' 
  },
  scrollContainer: {
    width: '100%'
  },
  subHeading: {
    fontSize:20,
    marginVertical: 15,
    marginTop:50,
    textAlign: 'center',
    fontWeight:'bold'

  }
});

