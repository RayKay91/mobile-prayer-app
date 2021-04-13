import React from 'react'
import { StyleSheet } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'

const WebViewContainer = ( { text, title } ) => {
    return (

        <AutoHeightWebView
            style={ { width: '100%' } }
            androidHardwareAccelerationDisabled
            customStyle={ `
                h1,h2,h3,h4,h5,h6,p, .title { font-family: Arial, Helvetica, sans-serif; color: #333}
                .title { font-weight: bold; color: rgb(161, 43, 110)  }
                a {color:rgb(161, 43, 110)  }
                
                h2.has-vivid-purple-color {
                    text-align: right !important
                }

                h2 span {
                    display: inline-block !important;
                    font-size: 20px !important;
                    margin-bottom: 12px !important;
                    color: white !important;
                    background-color: rgb(161, 43, 110) !important;
                    padding: 2px 8px !important;
                    border-radius: 5px !important;
                }
                
                `}
            scrollEnabled={ false }
            // bounces={ false }
            scrollEnabledWithZoomedin={ true }
            containerStyle={ [ styles.container, { marginBottom: 40, width: '95%', overflow: 'hidden' } ] }
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
