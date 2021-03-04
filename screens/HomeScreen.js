
import React, {useState, useCallback} from 'react'
import {StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl, Pressable} from 'react-native';
import * as Haptics from 'expo-haptics'
import { useFocusEffect } from '@react-navigation/native';
//components
import Table from '../components/table'
import WebViews from '../components/WebViews'
//utility functions
import wait from '../utils/wait'
import getDate from '../utils/getDate'
import currentTime from '../utils/currentTime'

export default function HomeScreen({navigation}) {
    const [refreshing, setRefreshing] = useState(0);
    const [showRefresh, setShowRefresh] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [showTmrwTimes, setShowTmrwTimes] = useState(false)


    useFocusEffect(
      useCallback(() => {
        //incrementing by 1 to trigger rerender of table component
        setRefreshing(prevState => prevState + 1)
    },[])
    )
    
    
    const handlePress = async () => {
      setNotifications(!notifications);
      navigation.navigate('Notifications', {notifications})
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    };

    const handleHold = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setShowTmrwTimes(true)
      await wait(50)
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await wait(120)
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const handleRelease = async () => {
      setShowTmrwTimes(false)
    }
  
  
    const onRefresh = () => {
      setShowRefresh(true);
      setRefreshing(prevState => prevState + 1)
      wait(2000).then(() => setShowRefresh(false));
    };
  
    const { gregorianDate, hijriDate } = getDate();
    const { timeWithSeconds } = currentTime();
  
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <StatusBar barStyle={"dark-content"} />
  
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={showRefresh}
              onRefresh={onRefresh}
              tintColor={"rgb(161, 43, 110)"}
              title={"last refreshed at " + timeWithSeconds}
              titleColor={"#888"}
            />
          }
        >
          <Text style={styles.refreshNotice}>Pull to refresh</Text>
          <Text style={[styles.date, { marginBottom: 5 }]}>{gregorianDate}</Text>
          <Text style={[styles.date, { marginTop: 5, fontSize: 15 }]}>
            {hijriDate}
          </Text>
  
          <Table notifications={notifications} refreshing={refreshing} showTmrwTimes={showTmrwTimes} />

          <Pressable style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: pressed ? '#790D5A' : '#A12B6E'
          }]}
          onPressIn={handleHold}
          onPressOut={handleRelease}
          >
            <Text style={styles.btnText}>Hold For Tomorrow's Times</Text>
          </Pressable>

          <Pressable style={({pressed}) => [
            styles.btn,
            {
            backgroundColor: pressed ? '#790D5A' : '#A12B6E',
            marginBottom: 25
            }
            ]}
            onPress={handlePress}
            >
            <Text
              style={styles.btnText}
            >
              Prayer Notifications {'>>'}
            </Text>
          </Pressable>
  
          <WebViews refreshing={refreshing} />
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ebecf0",

    },
    date: {
      fontSize: 21,
      marginTop: 15,
      marginBottom: 20,
      color: "#444",
      fontWeight: "bold",
      textAlign: "center",
    },
    scrollContainer: {
      width: "100%",
    },
    refreshNotice: {
      textAlign: "center",
      color: "#888",
    },
    btnText: {
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      letterSpacing: 1.3,
    },
    btn: {
      padding: 15,
      borderRadius: 7,
      backgroundColor: 'rgb(161, 43, 110)',
      width: "70%",
      marginTop: 30,
      marginLeft: "auto",
      marginRight: "auto",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 2,
      backgroundColor: "#0000",
    },
    
  });
  
  