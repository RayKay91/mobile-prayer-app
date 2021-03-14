import React from 'react'
import { Text } from 'react-native'
import * as Linking from 'expo-linking'

const anchorTag = ( { url, children, style } ) => {
    const handlePress = () => {
        Linking.openURL( url )
    }
    return (
        <Text style={ style } onPress={ handlePress }>{ children }</Text>
    )
}

export default anchorTag
