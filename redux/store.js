import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import notificationsReducer from './notificationsSlice'
import idsReducer from './idsSlice'

const rootReducer = combineReducers( {
    notifications: notificationsReducer,
    notificationIDs: idsReducer
} )

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage
}

const persistedReducer = persistReducer( persistConfig, rootReducer )

export const store = configureStore( {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware( {
        serializableCheck: {
            ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
        }
    } )
} )

export let persistor = persistStore( store )
