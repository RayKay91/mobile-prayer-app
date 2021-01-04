import React from 'react'
import { StyleSheet, View } from 'react-native'
import Anchor from './anchor'


const Tweet = ({text}) => {

  

    return (

        <View style={styles.container}>
            <Anchor href='https://twitter.com/wisemasjid'>{text}</Anchor>
        </View>

    )
}

export default Tweet

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'rgb(161, 43, 110)',
        borderRadius:5,
        marginVertical: 10,
        padding:20,
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
