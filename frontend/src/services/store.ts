import { configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'

import persistStore from 'redux-persist/es/persistStore'
import weblarekApi from '../utils/weblarek-api'
import { rootReducer } from './rootReducer'
const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.MODE !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: weblarekApi,
            },
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
