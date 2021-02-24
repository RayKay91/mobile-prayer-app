import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TableHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.wide]}></Text>
            <Text style={[styles.text, styles.narrow]}>Start</Text>
            <Text style={[styles.text, styles.narrow]}>Jama'ah</Text>
        </View>
    )
}

export default TableHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 2,

        borderColor: '#333',
        height: 50,
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#777'
    },
    wide: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    narrow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    }

})
