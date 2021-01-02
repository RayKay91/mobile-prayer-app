import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import Tweet from './tweet'
import getTweets from '../utils/getTweets'

const Tweets = () => {

    const [tweets, setTweets] = useState([])
 

  
  useEffect(() => {

    getTweets().then(tweets => setTweets(tweets.data))
    .catch(err => console.log(`something went wrong getting the tweets: ${err}`))
  }, [])


    return (
        <SafeAreaView>
        

        {tweets.map(tweet => <Tweet text={tweet.text} key={tweet.id}/>)}

        </SafeAreaView>
    )
}

export default Tweets

const styles = StyleSheet.create({})
