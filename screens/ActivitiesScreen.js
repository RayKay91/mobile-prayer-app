import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, SectionList, Alert } from 'react-native'
import ActivityComponent from '../components/activityComponent'
import Loading from '../components/loading'
import getActivitiesData from '../utils/getActivitiesData';
import ActivityDay from '../components/activityDay'


export default function ActivitiesScreen() {
    const [ activitiesData, setActivitiesData ] = useState( null )
    const sectionList = useRef()
    const day = new Date().getDay()

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

    const autoScroll = () => {

        sectionList.current.scrollToLocation( {
            animated: true,
            itemIndex: 0,
            sectionIndex: day === 0 ? 6 : day - 1
        } )
    }





    if ( !activitiesData ) return <Loading />

    let monData = activitiesData.filter( item => item.WeekDay === 'Monday' )
    let tuesData = activitiesData.filter( item => item.WeekDay === 'Tuesday' )
    let wedData = activitiesData.filter( item => item.WeekDay === 'Wednesday' )
    let thurData = activitiesData.filter( item => item.WeekDay === 'Thursday' )
    let friData = activitiesData.filter( item => item.WeekDay === 'Friday' )
    let satData = activitiesData.filter( item => item.WeekDay === 'Saturday' )
    let sunData = activitiesData.filter( item => item.WeekDay === 'Sunday' )

    //sorting algorithm for chronologically ordering activities

    const weeksData = [ monData, tuesData, wedData, thurData, friData, satData, sunData ]
    //sort by hour
    weeksData.forEach( dayData => {
        dayData.sort( ( a, b ) => {
            let timeA = a.Time.split( ':' )
            timeA = +timeA[ 0 ]
            let timeB = b.Time.split( ':' )
            timeB = +timeB[ 0 ]

            return timeA - timeB;
        } )
    } )
    //sort by minutes
    weeksData.forEach( dayData => {
        dayData.sort( ( a, b ) => {
            let timeA = a.Time.split( ':' )
            timeA = +timeA[ 1 ]
            let timeB = b.Time.split( ':' )
            timeB = +timeB[ 1 ]

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
                ref={ sectionList }
                onScrollToIndexFailed={ () => Alert.alert( 'These are the current activities' ) }
                onLayout={ () => setTimeout( autoScroll, 225 ) }
            >

            </SectionList>
        </SafeAreaView >

    )
}


