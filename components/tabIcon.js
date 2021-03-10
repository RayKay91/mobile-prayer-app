import React from 'react'
import { Image } from 'react-native'

const tabIcon = ( { width, height, source } ) => {
    return (
        <Image
            source={ source }
            fadeDuration={ 0 }
            style={ { width, height, marginTop: 3 } }
        />
    )
}

export default tabIcon

