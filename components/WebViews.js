import React, {useState, useEffect} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import WebViewContainer from './webViewContainer'
import getWebViewContent from '../utils/getWebViewContent'

const WebViews = ({refreshing}) => {

    const [content, setContent] = useState([])

  
  useEffect(() => {

    getWebViewContent().then(newContent => setContent(newContent))
    
  }, [refreshing])


    return (
        <View style={styles.webViewsContainer}>
          {content.map((contentItem) => <WebViewContainer text={contentItem.content.rendered} key={contentItem.id}></WebViewContainer>)}
          </View>
    )
}


export default WebViews

const styles = StyleSheet.create({
  webViewsContainer: {
    marginBottom: 40
  }
})
