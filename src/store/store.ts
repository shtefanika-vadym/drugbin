import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import { authApi } from 'features/Auth'
import { homeSlice } from 'features/Home/state/slices/homeSlice'

const rootReducer = combineReducers({
  homeReducer: homeSlice.reducer,
  [authApi.reducerPath as keyof object]: authApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
})
