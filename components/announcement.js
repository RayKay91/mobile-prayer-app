import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview';


const Announcement = ({text}) => {
        return (
            <View style={styles.container}>
            <WebView
            originWhitelist={['*']}
            source={{ html: '<meta name="viewport" content="width=device-width, initial-scale=1"></meta>' + text }}
            />
            </View>
        );
}



export default Announcement

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'rgb(161, 43, 110)',
        borderRadius:5,
        marginVertical: 10,
        height: 300,
        padding:30,
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
