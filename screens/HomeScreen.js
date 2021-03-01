
import React, {useState, useCallback, useEffect} from 'react'
import {StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl, Pressable} from 'react-native';
import * as Haptics from 'expo-haptics'

//components
import Table from '../components/table'
import Announcements from '../components/announcements'
//utility functions
import wait from '../utils/wait'
import getDate from '../utils/getDate'
import currentTime from '../utils/currentTime'
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
    const [refreshing, setRefreshing] = useState(0);
    const [showRefresh, setShowRefresh] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [showTmrwTimes, setShowTmrwTimes] = useState(false)


    useFocusEffect(
      useCallback(() => {
        //incrementing by 1 to trigger rerender
        setRefreshing(prevState => prevState + 1)
    },[])
    )
    
 
   
    
    const handlePress = async () => {
      setNotifications(!notifications);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    };

    const handleHold = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setShowTmrwTimes(true)

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
          styles.btnContainer,
          {
            backgroundColor: pressed ? 'rgb(121, 13, 90)' : 'rgb(161, 43, 110)'
          }]}
          onPressIn={handleHold}
          onPressOut={handleRelease}
          >
            <Text style={styles.btnText}>Hold For Tomorrow's Times</Text>
          </Pressable>

          <Pressable style={({pressed}) => [
            styles.btnContainer,
            {
            backgroundColor: pressed ? 'rgb(121, 13, 90)' : 'rgb(161, 43, 110)',
            marginBottom: 40
            }
            ]}>
            <Text
              style={styles.btnText}
              onPress={handlePress}
            >
              Prayer Notifications: {notifications ? "On" : "Off"}
            </Text>
          </Pressable>
  
          <Text style={styles.subHeading}>Announcements</Text>
  
          <Announcements refreshing={refreshing} />
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ebecf0",
      alignItems: "center",
      paddingHorizontal: 15,
      maxWidth: 800,
    },
    date: {
      fontSize: 21,
      marginVertical: 45,
      color: "#444",
      fontWeight: "bold",
      textAlign: "center",
    },
    scrollContainer: {
      width: "100%",
    },
    subHeading: {
      fontSize: 20,
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
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
    btnContainer: {
      padding: 15,
      borderRadius: 7,
      backgroundColor: 'rgb(161, 43, 110)',
      width: "70%",
      marginTop: 40,
      marginLeft: "auto",
      marginRight: "auto",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 12,
      backgroundColor: "#0000",
    },
    
  });
  
  