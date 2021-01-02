import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Row = ({children, pTime, jTime, isHighlighted, noBottomBorder}) => {


    return (
        <View style={[styles.container, isHighlighted ? styles.highlightedContainer : styles.container, {borderBottomWidth : noBottomBorder ? 0 : 2}]}>

            <View style={styles.wideBlock}>
                <Text style={[styles.text, isHighlighted ? styles.highlightedText: styles.text]}>{children}</Text>
            </View>

            <View style={styles.narrowBlock}>
                <Text style={[styles.text, isHighlighted ? styles.highlightedText: styles.text]}>{pTime}</Text>
            </View>

            <View style={styles.narrowBlock}> 
                <Text style={[styles.text, isHighlighted ? styles.highlightedText: styles.text]}>{jTime}</Text>
            </View>

        </View>
    )
}

export default Row

const styles  = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        borderColor: '#222',
        height: 50,
        alignItems: 'center'
    },
    wideBlock: {
        // borderWidth:3, 
        // borderColor:'coral',
        flex: 3.5, 
        fontSize: 20, 
        padding: 5,
        paddingLeft: 20,
        // justifyContent:'center',
        alignItems: 'center',
        flexDirection:'row',
        height: '100%'

    },
    narrowBlock: {
        // borderWidth:1, 
        // borderColor:'coral',
        flex: 2, 
        fontSize: 20, 
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'row',
        height: '100%'


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
    },
    

})

