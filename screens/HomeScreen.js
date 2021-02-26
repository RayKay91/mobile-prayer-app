
import React, {useState, useCallback, useEffect} from 'react'
import {StatusBar, ScrollView, StyleSheet, Text, View, SafeAreaView, RefreshControl} from 'react-native';
import * as Haptics from 'expo-haptics'

//components
import Table from '../components/table'
import Announcements from '../components/announcements'
//utility functions
import wait from '../utils/wait'
import getDate from '../utils/getDate'
import currentTime from '../utils/currentTime'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {
    const [refreshing, setRefreshing] = useState(0);
    const [showRefresh, setShowRefresh] = useState(false);
    const [notifications, setNotifications] = useState(true);

    useFocusEffect(
      useCallback(() => {
        setRefreshing(prevState => prevState + 1)
    },[])
    )
    
 
   
    
    const handlePress = async () => {
      setNotifications(!notifications);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    };
  
  
    const onRefresh = () => {
      setShowRefresh(true);
      
      //incrementing by 1 to trigger rerender
      // setRefreshing(refreshing + 1);
  
      wait(2000).then(() => setShowRefresh(false));
    };
  
    const { gregorianDate, hijriDate } = getDate();
    const { timeWithSeconds } = currentTime();
  
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }} />
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
  
          <Table notifications={notifications} refreshing={refreshing} />
          <View style={styles.btnContainer}>
            <Text
              style={[styles.btn, notifications ? styles.btnActive : ""]}
              onPress={handlePress}
            >
              Prayer Notifications: {notifications ? "On" : "Off"}
            </Text>
          </View>
  
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
    btn: {
      backgroundColor: "#ebecf0",
      padding: 15,
      textAlign: "center",
      color: "rgb(161, 43, 110)",
      fontWeight: "bold",
      borderRadius: 7,
      borderWidth: 2,
      borderColor: "rgb(161, 43, 110)",
      overflow: "hidden",
      letterSpacing: 1.3,
    },
    btnActive: {
      backgroundColor: "rgb(161, 43, 110)",
      color: "white",
    },
    btnContainer: {
      width: "70%",
      marginTop: 40,
      marginBottom: 40,
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
  
  