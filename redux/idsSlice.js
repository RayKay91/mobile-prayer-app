import { createSlice } from '@reduxjs/toolkit'


export const notificationIDsSlice = createSlice( {
    name: 'notificationIDS',
    initialState: {
        FajrNotification: 'defaultID',
        DhuhrNotification: 'defaultID',
        AsrNotification: 'defaultID',
        MaghribNotification: 'defaultID',
        IshaaNotification: 'defaultID',
    },
    reducers: {
        updateNotificationID: ( state, action ) => {

            const { pNameNotification, notificationID } = action.payload
            state[ pNameNotification ] = notificationID
        }

    }
} )

// Action creators are generated for each case reducer function
export const { updateNotificationID } = notificationIDsSlice.actions

export default notificationIDsSlice.reducer