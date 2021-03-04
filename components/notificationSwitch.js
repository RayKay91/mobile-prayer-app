import React, {useState} from 'react'
import { StyleSheet, Text, View , Switch} from 'react-native'

const notificationSwitch = ({prayerName}) => {

    const [isEnabled, setIsEnabled] = useState(true)
    
    const handleSwitchToggle = (val) => {
        setIsEnabled(val)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.switchLabel}>{prayerName}</Text>
            <Switch
                onValueChange={handleSwitchToggle}
                trackColor={{true: 'rgb(161, 43, 110)'}}
                value={isEnabled}
            />
        </View>
    )
}

export default notificationSwitch

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginVertical: 7,
        borderBottomWidth: 1,
        alignItems: 'center'


    },
    switchLabel: {
        fontSize: 19
    }
})
