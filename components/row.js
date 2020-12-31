import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Row = ({children, pTime, jTime, isHighlighted}) => {


    return (
        <View style={[styles.container, isHighlighted ? styles.highlightedContainer : styles.container]}>

            <View style={styles.block}>
                <Text style={[styles.text, isHighlighted ? styles.highlightedText: styles.text]}>{children}</Text>
            </View>

            <View>
                <Text style={[styles.text, isHighlighted ? styles.highlightedText: styles.text]}>{pTime}</Text>
            </View>

            <View> 
                <Text style={[styles.text, isHighlighted ? styles.highlightedText: styles.text]}>{jTime}</Text>
            </View>

        </View>
    )
}

export default Row

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderWidth: 1,
        borderColor: 'salmon',
        height: 50,
        alignItems: 'center'
    },
    block: {
        borderWidth:3, 
        borderColor:'coral',
        width: 100, 
        fontSize: 20, 
        padding: 5,
    },
    text: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 20
},
 
    highlightedContainer: {
        backgroundColor: 'rgb(161, 43, 110)',
        flexDirection: 'row'
           

    },
    highlightedText: {
        color: 'white',
        

    }

})

