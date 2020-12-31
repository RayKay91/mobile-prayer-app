import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TableHeader = () => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default TableHeader

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
})
