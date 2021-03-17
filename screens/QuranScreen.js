import { useFocusEffect } from '@react-navigation/native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView, Text } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'

const customCSS = `

/* site footer removal */

footer {
    display: none !important
}

/* popular search suggestion removal */

.popular-search {
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

/* menu links removal except home link */

.main-menu li.d-block:not(li.d-block:first-of-type) {
    display: none !important
}

/* sharing link removal */

div.row.verse-actions-below > div.col-md-1.order-1.order-md-0 > div > a:nth-child(4) {
    display: none !important;
}

/* reflection link removal */

.reflection-link {
    display: none !important
}

/* audio player controls removal */

#player {
    display: none !important
}

/* removal of translations from dropdown surah selector */

.surah-dropdown .pr-3 p {
    display: none !important
}

/* removal of some tafaaseer */

div[data-controller="tafsir-modal"] > div {
    display: none !important
}

#tafsir-results > li:nth-child(1),
#tafsir-results > li:nth-child(2),
#tafsir-results > li:nth-child(3),
#tafsir-results > li:nth-child(4),
#tafsir-results > li:nth-child(5),
#tafsir-results > li:nth-child(6),
#tafsir-results > li:nth-child(8),
#tafsir-results > li:nth-child(10),
#tafsir-results > li:nth-child(12),
#tafsir-results > li:nth-child(14),
#tafsir-results > li:nth-child(15),
#tafsir-results > li:nth-child(16),
#tafsir-results > li:nth-child(17) 
{
    display: none !important;
}

`

export default function QuranScreen() {





    return (
        <SafeAreaView style={ { flex: 1 } }>
            <AutoHeightWebView
                customStyle={ customCSS }
                containerStyle={ { flex: 1, overflow: 'visible' } }
                originWhiteList={ [ 'https://quran.com/*' ] }
                source={ { uri: 'https://quran.com' } }
            />
        </SafeAreaView>

    )
}

