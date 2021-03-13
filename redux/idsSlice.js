import { createSlice } from '@reduxjs/toolkit'


export const notificationIDsSlice = createSlice( {
    name: 'notificationIDS',
    initialState: {
        FajrNotification: 'none',
        tmrwFajrNotification: 'none',
        DhuhrNotification: 'none',
        AsrNotification: 'none',
        MaghribNotification: 'none',
        IshaaNotification: 'none',
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