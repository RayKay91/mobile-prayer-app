import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl} from 'react-native';
//components
import Table from './components/table'
import Tweets from './components/tweets'
import Anchor from './components/anchor'
//utility functions
import wait from './utils/wait'
import getDate from './utils/getDate'



export default function App() {

  const [date, setDate] = useState('')

  useEffect( () => {

    getDate().then(date => setDate(date))
    .catch(err => console.log(`Date fetching error: ${err}`))

  }, [])





  const [refreshing, setRefreshing] = useState(0)
  const [showRefresh, setShowRefresh] = useState(false)





  const onRefresh = () => {
    setShowRefresh(true)
    //adding 1 to change the state, which is passed as a prop to the components 'Table' and 'Tweets' which have a useEffect dependency on the prop. Each time the state is changed the prop will update and the useEffect will run.
    setRefreshing(refreshing + 1)

    wait(2000).then(()=> setShowRefresh(false))



  }

  return (
    <View style={ styles.container }>
    <SafeAreaView style={{flex: 1}}/>

    <ScrollView 
    style={styles.scrollContainer} showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl refreshing={showRefresh} onRefresh={onRefresh} color={['rgb(161, 43, 110)']} tintColor={'rgb(161, 43, 110)'}/>
    }
    >

  
     <Text style={styles.refreshNotice}>Pull to refresh</Text>
      <Text style={styles.date}>{date}</Text>

      <Table refreshing={refreshing}/>

      <Text style={styles.subHeading}>Latest Tweets and Announcements</Text>

      <Tweets refreshing={refreshing}/>

      <Anchor style={styles.donate} href='https://www.totalgiving.co.uk/appeal/wisemasjidcovid19/donate'>Donate</Anchor>
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
    marginVertical: 15,
    marginTop:50,
    textAlign: 'center',
    fontWeight:'bold'

  },
  refreshNotice: {
    textAlign: 'center',
    color: '#888'
  },
  donate: {
    backgroundColor: 'rgb(161, 43, 110)',
    padding: 15,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: '33%',
    marginBottom: 100,
    color: 'white',
    width: '30%',
    fontWeight:'bold',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgb(161, 43, 110)',
    overflow: 'hidden'
  }
});

