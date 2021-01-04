import React, {useState, useEffect} from 'react';
import {StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl} from 'react-native';
//components
import Table from './components/table'
import Tweets from './components/tweets'
import Anchor from './components/anchor'
//utility functions
import wait from './utils/wait'
import getDate from './utils/getDate'
import currentTime from './utils/currentTime'







export default function App() {



  const [date, setDate] = useState('')

  useEffect( () => {

    getDate().then(date => setDate(date))
    .catch(err => console.log(`Date fetching error: ${err}`))
  }, [])


  const [notifications, setNotifications] = useState(true)
  const handlePress = () => {
    setNotifications(!notifications)
  }

  const [refreshing, setRefreshing] = useState(0)
  const [showRefresh, setShowRefresh] = useState(false)

  const onRefresh = () => {
    setShowRefresh(true)
    //adding 1 to change the state, which is passed as a prop to the components 'Table' and 'Tweets' which have a useEffect dependency on the prop. Each time the state is changed the prop will update and the useEffect will run.
    setRefreshing(refreshing + 1)

    wait(2000).then(()=> setShowRefresh(false))
  }

  const {timeWithSeconds} = currentTime()

  return (
    <View style={ styles.container }>
    <SafeAreaView style={{flex: 1}}/>
    <StatusBar  barStyle={'dark-content'} />

    <ScrollView 
    style={styles.scrollContainer} showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl refreshing={showRefresh} onRefresh={onRefresh} tintColor={'rgb(161, 43, 110)'} title={'last refreshed at ' + timeWithSeconds} titleColor={'#888'} />
    }
    >

  
      <Text style={styles.refreshNotice}>Pull to refresh</Text>
      <Text style={styles.date}>{date}</Text>

      <Table notifications={notifications} refreshing={refreshing}/>

      <Text onPress={handlePress}>Notifications: {notifications ? 'On' : 'Off'}</Text>

      <View style={styles.donateContainer}>
      <Anchor style={styles.donate} href='https://www.totalgiving.co.uk/appeal/wisemasjidcovid19/donate'>Donate</Anchor>
      </View>

      <Text style={styles.subHeading}>Latest Tweets and Announcements</Text>

      <Tweets refreshing={refreshing}/>

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
     marginTop:35, 
     marginBottom: 50, 
     color: '#444', 
     fontWeight:'bold', 
     textAlign: 'center' 
  },
  scrollContainer: {
    width: '100%',

  },
  subHeading: {
    fontSize:20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:'bold'

  },
  refreshNotice: {
    textAlign: 'center',
    color: '#888'
  },
  donate: {
    // backgroundColor: 'rgb(161, 43, 110)',
    backgroundColor: '#ebecf0',
    padding: 15,
    textAlign: 'center',
    marginVertical:60,
    marginHorizontal: '30%',
    color: 'rgb(161, 43, 110)',
    width: '40%',
    fontWeight:'bold',
    borderRadius: 7,
    // borderWidth: 1,
    // borderColor: 'rgb(161, 43, 110)',
    overflow: 'hidden',
    

  },
  donateContainer: {
    shadowColor: "black",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4
    }
  
});

