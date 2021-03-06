import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './notificationsSlice'
import idsReducer from './idsSlice'

export default configureStore( {
    reducer: {
        notifications: notificationsReducer,
        notificationIDs: idsReducer
    }
} )