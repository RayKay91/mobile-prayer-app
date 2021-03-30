import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const Loading = () => {
    return (
        <View style={ [ styles.container ] }>
            <ActivityIndicator size="large" color='#A12B6E' />
        </View >
    )
}

export default Loading

const styles = StyleSheet.create( {
    container: {
        flex: 9,
        justifyContent: 'center',
    }
} )