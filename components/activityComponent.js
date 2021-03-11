import React from 'react'
import { StyleSheet, View, Text } from 'react-native'



const ActivityComponent = ( { data } ) => {

    const { Speaker, GroupType, Description, Time, Venue, DatesCancelled } = data
    return (
        <View style={ styles.container }>
            <View style={ styles.row }>
                <Text style={ [ styles.text, styles.large ] }>{ Description }</Text>
                <Text style={ [ styles.text, { marginTop: -10, fontSize: 12 } ] }>{ GroupType }</Text>
            </View>
            <Text style={ [ styles.text, { fontWeight: 'bold', fontSize: 16, marginBottom: 10 } ] }>{ Time }</Text>
            { Speaker ? <Text style={ [ styles.text, { marginBottom: 6 } ] }>{ Speaker }</Text> : null }
            <Text style={ [ styles.text ] }>{ Venue }</Text>
            {DatesCancelled ? <Text style={ styles.cancelled }>{ DatesCancelled }</Text> : null }

        </View>

    );
}

export default ActivityComponent

const styles = StyleSheet.create( {
    container: {
        height: 125,
        marginBottom: 30,
        width: '97%',
        borderWidth: 2,
        borderColor: 'rgb(161, 43, 110)',
        borderRadius: 5,
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    text: {
        color: '#333',
    },
    large: {
        fontSize: 17,
        fontWeight: 'bold',
        maxWidth: '75%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    cancelled: {
        fontWeight: 'bold',
        backgroundColor: '#ed4337',
        padding: 3,
        paddingHorizontal: 8,
        color: 'white',
        alignSelf: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }
} )