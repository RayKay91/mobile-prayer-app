import React from 'react'
import { StyleSheet } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'



const WebViewContainer = ({text}) => {
        return (
            <AutoHeightWebView 
            style={{width: '100%'}}
            customStyle={`
            h1,h2,h3,h4,h5,h6,p { font-family: Arial, Helvetica, sans-serif;}
            `}
            scrollEnabled={false}
            scrollEnabledWithZoomedin={true}
            containerStyle={[styles.container, {marginBottom: 40, width: '97%', overflow:'hidden'}]}
            scalesPageToFit={true}
            viewportContent={'width=device-width'}
            originWhitelist={['https://wise-web.org/*']}
            source={{ html: '<meta name="viewport" content="width=device-width, initial-scale=1"></meta>' + text }}
            />

);
}




export default WebViewContainer

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'rgb(161, 43, 110)',
        borderRadius:5,
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    
})
