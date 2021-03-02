import React, {useState, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {SafeAreaView, Text} from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import getDuaContent from '../utils/getDuas.js'

//custom styling to be injected into Dua tab. Affects the HTML being rendered in the webview. Inline styles being overwritten using !important.

const customCssStyles = `
/* styling reset */                   
* { 
    font-family: Arial, Helvetica, sans-serif !important;
    color: #333 !important;
    font-weight: 400 !important;
    font-size: 16px !important
}
/* styling reset end*/

/*Main title*/
h5:first-of-type {
    text-align: center !important
}
h5 span:first-of-type {
    font-size: 25px !important;
    font-weight: 600 !important;
    color: rgb(161, 43, 110) !important;
    text-decoration: underline

}


/*Arabic text*/    
h2 span[style="color: #993300;"], h2 span[style="color: #993366;"] {
    color: rgb(161, 43, 110) !important;
    font-size: 25px !important;
    font-weight: 600 !important
}

/* translations */

p, p strong, p span , h5[style="text-align: center;"] {
    color: #333 !important;
    font-size: 17px !important;
    font-weight: 600 !important
}

/* subheadings */

p span[style="color: #800080;"] strong {
    color: #763e8c !important;
    font-size: 18px !important;
    text-decoration: underline
}

/* subheading - the 'Allāh says...' and 'Hadīth...' at the bottom*/
h2 span[style="color: #000080;"] {
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #763e8c !important;
    text-decoration: underline
}


`

export default function DuaScreen(){

    const [duaContent, setDuaContent] = useState('')

    useFocusEffect(
        useCallback(
            () => {
                
                if (!duaContent) getDuaContent().then(fetchedDuaContent => setDuaContent(fetchedDuaContent)).catch(err => console.log(err)) 
            },
            [],
        )
    )
        if (duaContent){

            return(
                
                <SafeAreaView style={{flex:1, marginBottom: 20}}>
                <AutoHeightWebView
                    style={{width: '95%', marginLeft: 'auto', marginRight: 'auto'}}
                    customStyle={customCssStyles}
                    containerStyle={{flex: 1}}
                    originWhiteList={['*']}
                    source={{html: '<meta name="viewport" content="width=device-width, initial-scale=1">' + duaContent}}
                />
                </SafeAreaView>


            )
        } else {
            return (<SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 25, color: 'rgb(161, 43, 110)', textAlign:'center'}}>Loading...</Text>
                </SafeAreaView>
            )
        }

}

    