import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const activityDay = ( { heading } ) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>{ heading }</Text>
        </View>
    )
}

export default activityDay

const styles = StyleSheet.create( {
    container: {
        backgroundColor: 'rgb(161, 43, 110)',
        paddingVertical: 8,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    text: {
        color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 20
    }
} )
