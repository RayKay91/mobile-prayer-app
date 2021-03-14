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

        let monData = activitiesData.filter( item => item.WeekDay === 'Monday' )
        let tuesData = activitiesData.filter( item => item.WeekDay === 'Tuesday' )
        let wedData = activitiesData.filter( item => item.WeekDay === 'Wednesday' )
        let thurData = activitiesData.filter( item => item.WeekDay === 'Thursday' )
        let friData = activitiesData.filter( item => item.WeekDay === 'Friday' )
        let satData = activitiesData.filter( item => item.WeekDay === 'Saturday' )
        let sunData = activitiesData.filter( item => item.WeekDay === 'Sunday' )

        //sorting algorithm for chronologically ordering activities

        const weeksData = [ monData, tuesData, wedData, thurData, friData, satData, sunData ]

        weeksData.forEach( dayData => {
            dayData.sort( ( a, b ) => {
                let timeA = +a.Time.substring( 0, 2 );
                let timeB = +b.Time.substring( 0, 2 );
                return timeA - timeB;
            } )
        } )


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

