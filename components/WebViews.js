import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import WebViewContainer from './webViewContainer'
import capitalise from '../utils/capitalise'

const WebViews = ({ webViewContent }) => {
  return (
    <View style={styles.webViewsContainer}>
      {webViewContent.map((item, i) => (
        <WebViewContainer text={item.text} key={i} title={item.title} />
      ))}
    </View>
  )
}

export default React.memo(WebViews)

const styles = StyleSheet.create({
  webViewsContainer: {
    marginBottom: 40,
  },
})
