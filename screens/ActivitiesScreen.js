import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, SectionList } from 'react-native'
import ActivityComponent from '../components/activityComponent'
import Loading from '../components/loading'
import getActivitiesData from '../utils/getActivitiesData';
import ActivityDay from '../components/activityDay'

export default function ActivitiesScreen() {
    const [ activitiesData, setActivitiesData ] = useState( null )

    useFocusEffect(
        useCallback(
            () => {
                // getActivitiesData().then( data => setActivitiesData( data ) )
                ( async function () {
                    const data = await getActivitiesData()
                    setActivitiesData( data )
                } )()
            },
            [],
        )
    )

    if ( !activitiesData ) {
        return <Loading />
    }
    else {

        const monData = activitiesData.filter( item => item.WeekDay === 'Monday' )
        const tuesData = activitiesData.filter( item => item.WeekDay === 'Tuesday' )
        const wedData = activitiesData.filter( item => item.WeekDay === 'Wednesday' )
        const thurData = activitiesData.filter( item => item.WeekDay === 'Thursday' )
        const friData = activitiesData.filter( item => item.WeekDay === 'Friday' )
        const satData = activitiesData.filter( item => item.WeekDay === 'Saturday' )
        const sunData = activitiesData.filter( item => item.WeekDay === 'Sunday' )
        const activityData = [
            { title: 'Monday', data: monData },
            { title: 'Tuesday', data: tuesData },
            { title: 'Wednesday', data: wedData },
            { title: 'Thursday', data: thurData },
            { title: 'Friday', data: friData },
            { title: 'Saturday', data: satData },
            { title: 'Sunday', data: sunData },
        ]
        return (
            <SafeAreaView>
                <SectionList
                    sections={ activityData }
                    renderItem={ ( { item } ) => <ActivityComponent data={ item } /> }
                    renderSectionHeader={ ( { section } ) => <ActivityDay heading={ section.title } /> }
                    keyExtractor={ item => item.ActivityID }
                    stickySectionHeadersEnabled

                >

                </SectionList>
            </SafeAreaView>

        )
    }
}

