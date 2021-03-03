import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import WebViewContainer from './webViewContainer'
import getWebViewContent from '../utils/getWebViewContent'
import capitalise from '../utils/capitalise'

const WebViews = ({refreshing}) => {

    const [otherContent, setOtherContent] = useState([])
    const [announcementAndReminder, setAnnouncementAndReminder] = useState([])
      
  useEffect(() => {
    getWebViewContent().then(([announcements, otherContent]) => {
      setAnnouncementAndReminder(announcements)
      setOtherContent(otherContent)
    })
    
  }, [refreshing])


    return (
        <View style={styles.webViewsContainer}>
            {announcementAndReminder.map((item) => {
              return <WebViewContainer text={item.content.rendered} key={item.id} title={item.title.rendered} />
            } 
          )}

          {otherContent.map(item => {
            if( item.slug === 'quran' || item.slug === 'dhikr'){
              return (
                <WebViewContainer 
                text={item.content.rendered} key ={item.id} title={capitalise(item.slug)}   
                />)
            }
          })}
          </View>
    )
}


export default React.memo(WebViews)

const styles = StyleSheet.create({
  webViewsContainer: {
    marginBottom: 40
  }
})
