import React, {useState} from 'react';
import {StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl} from 'react-native';
import * as Haptics from 'expo-haptics'

//components
import Table from './components/table'
import Tweets from './components/tweets'
import Anchor from './components/anchor'
//utility functions
import wait from './utils/wait'
import getDate from './utils/getDate'
import currentTime from './utils/currentTime'




export default function App() {

  const [notifications, setNotifications] = useState(true)

  const handlePress = async () => {
    setNotifications(!notifications)
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  const [refreshing, setRefreshing] = useState(0)
  const [showRefresh, setShowRefresh] = useState(false)

  const onRefresh = () => {
    setShowRefresh(true)

    //adding 1 to change the state, which is passed as a prop to the components 'Table' and 'Tweets' which have a useEffect dependency on the prop. Each time the state is changed the prop will update and the useEffect will run. Only incrementing instead of using bool because we only need the state to change once. If we set state to true then false after it has finished refreshing then it will cause a pointless rerender. Using setRefreshing(!refreshing) isn't very accurate as the bool will may be false when it is refreshing. This is why I opted to use a counter.
    
    setRefreshing(refreshing + 1)

    wait(2000).then(()=> setShowRefresh(false))
  }

  const {gregorianDate, hijriDate} = getDate()
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
      <Text style={[styles.date, {marginBottom: 5}]}>{gregorianDate}</Text>
      <Text style={[styles.date, {marginTop: 5, fontSize: 15}]}>{hijriDate}</Text>

      <Table notifications={notifications} refreshing={refreshing}/>
      <View style={[styles.btnContainer, {width: '55%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 0}]}>
      <Text style={[styles.btn, notifications ? styles.btnActive: '']} onPress={handlePress}>Notifications: {notifications ? 'On' : 'Off'}</Text>

      </View>

      <View style={styles.btnContainer}>
      <Anchor style={styles.btn} href='https://www.totalgiving.co.uk/appeal/wisemasjidcovid19/donate'>Donate</Anchor>
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
     fontSize:21, 
     marginVertical:45, 
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
  btn: {
    backgroundColor: '#ebecf0',
    padding: 15,
    textAlign: 'center',
    color: 'rgb(161, 43, 110)',
    fontWeight:'bold',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'rgb(161, 43, 110)',
    overflow: 'hidden',
    letterSpacing: 1.3
  },
  btnActive: {
    backgroundColor: 'rgb(161, 43, 110)',
    color: 'white'
  },
  btnContainer: {
    width: '40%',
    marginVertical:40,
    marginHorizontal: '30%',
    shadowColor: "black",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
    backgroundColor: '#0000'
    }
  
});

