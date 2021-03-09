import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import Loading from '../components/loading'
import wait from '../utils/wait'

const customStyle = `
    #layers > div {
        display: none !important
    }
    #react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header {
        display: none !important
    }

`
export default function SocialScreen() {


    const [ website, setWebsite ] = useState( 'https://www.youtube.com/channel/UCMLvre3cjw790fs1gK0T8Ew' )
    const [ isLoading, setIsLoading ] = useState( false )

    const handlePressYT = async () => {
        setIsLoading( true )
        setWebsite( 'https://www.youtube.com/channel/UCMLvre3cjw790fs1gK0T8Ew' )
        await wait( 500 )
        setIsLoading( false )

    }
    const handlePressTW = async () => {
        setIsLoading( true )
        setWebsite( 'https://twitter.com/wisemasjid' )
        await wait( 500 )
        setIsLoading( false )
    }
    const handlePressIG = async () => {
        setIsLoading( true )
        setWebsite( 'https://www.instagram.com/wiseoninsta/' )
        await wait( 500 )
        setIsLoading( false )
    }
    const handlePressFB = async () => {
        setIsLoading( true )
        setWebsite( 'https://www.facebook.com/wiseonline' )
        await wait( 500 )
        setIsLoading( false )
    }

    return (
        <SafeAreaView style={ { flex: 1 } }>
            <View style={ { flexDirection: 'row', justifyContent: 'center', marginVertical: 25 } }>
                <Pressable onPress={ handlePressYT } style={ { marginRight: 13 } }>
                    <Text>Youtube</Text></Pressable>
                <Pressable onPress={ handlePressTW } style={ { marginRight: 13 } }><Text>Twitter</Text></Pressable>
                <Pressable onPress={ handlePressIG } style={ { marginRight: 13 } }><Text>Instagram</Text></Pressable>
                <Pressable onPress={ handlePressFB } style={ { marginRight: 13 } }><Text>Facebook</Text></Pressable>
            </View>
            {isLoading && <Loading /> }
            {!isLoading && <AutoHeightWebView
                style={ { width: '100%' } }
                customStyle={ customStyle }
                viewportContent={ 'width=device-width' }
                originWhitelist={ [ '*' ] }
                source={ { uri: website } }
            /> }
        </SafeAreaView>
    )
}