import { createSlice } from '@reduxjs/toolkit'


export const notificationsSlice = createSlice( {
    name: 'prayerNotifications',
    initialState: {
        Fajr: true,
        tmrwFajr: true,
        Dhuhr: true,
        Asr: true,
        Maghrib: true,
        Ishaa: true,
    },
    reducers: {
        shouldEnableNotification: ( state, action ) => {

            state[ action.payload.prayerName ] = action.payload.shouldEnable
        },


    }
} )

// Action creators are generated for each case reducer function
export const { shouldEnableNotification } = notificationsSlice.actions

export default notificationsSlice.reducer