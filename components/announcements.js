import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import Announcement from './announcement'
import getAnnouncements from '../utils/getAnnouncements'

const Announcements = ({refreshing}) => {

    const [announcements, setAnnouncements] = useState([])

  
  useEffect(() => {

    getAnnouncements().then(newAnnouncements => setAnnouncements(newAnnouncements))
    
  }, [refreshing])


    return (
        <View style={styles.announcementsContainer}>
          {announcements.map((announcement) => <Announcement text={announcement.content.rendered} key={announcement.id}></Announcement>)}
          </View>
    )
}


export default Announcements

const styles = StyleSheet.create({
  announcementsContainer: {
    marginBottom: 100
  }
})
