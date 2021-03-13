import React from 'react'
import { StyleSheet } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'



const WebViewContainer = ( { text, title } ) => {
    return (

        <AutoHeightWebView
            androidHardwareAccelerationDisabled
            style={ { width: '100%' } }
            customStyle={ `
                h1,h2,h3,h4,h5,h6,p, .title { font-family: Arial, Helvetica, sans-serif;}
                .title { font-weight: bold; color: rgb(161, 43, 110)  }
                `}
            scrollEnabled={ false }
            scrollEnabledWithZoomedin={ true }
            containerStyle={ [ styles.container, { marginBottom: 40, width: '97%', overflow: 'hidden' } ] }
            viewportContent={ 'width=device-width' }
            originWhitelist={ [ 'https://wise-web.org/*' ] }
            source={ { html: '<meta name="viewport" content="width=device-width, initial-scale=1">' + `<p class="title">${ title }</p>` + '\n\n' + text } }
        />
    );
}




export default WebViewContainer

const styles = StyleSheet.create( {
    container: {
        borderWidth: 2,
        borderColor: 'rgb(161, 43, 110)',
        borderRadius: 5,
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

} )
