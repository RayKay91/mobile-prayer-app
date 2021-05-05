
import React from 'react'
import { SafeAreaView } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import Loading from '../components/loading'
const customCSS = `

/* site footer removal */

footer, .footer {
    display: none !important
}

/* popular search suggestion removal */

.container.content-page {
    display: none !important
}

/* external site link removal */

.related-sites-section {
    display: none !important
}

/* external links removal */

.more-links {
    display: none !important
}

/* menu links removal */

.header-inner__firstpart__menu {
    display: none !important
}

`

export default function QuranScreen() {

    return (
        <SafeAreaView style={ { flex: 1 } }>
            <AutoHeightWebView
                customStyle={ customCSS }
                startInLoadingState={ true }
                renderLoading={ () => <Loading /> }
                decelerationRate={ 'normal' }
                containerStyle={ { flex: 1, overflow: 'visible' } }
                originWhiteList={ [ 'https://quran.com/*' ] }
                source={ { uri: 'https://quran.com' } }
            />
        </SafeAreaView>

    )
}

