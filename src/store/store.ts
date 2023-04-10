import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import { addApi } from 'features/AddNew/store/api/addApi'
import { authApi } from 'features/Auth'
import { historyApi } from 'features/History/store/api/productApi'
import { homeSlice } from 'features/Home/state/slices/homeSlice'

const rootReducer = combineReducers({
  homeReducer: homeSlice.reducer,
  [authApi.reducerPath as keyof object]: authApi.reducer,
  [historyApi.reducerPath as keyof object]: historyApi.reducer,
  [addApi.reducerPath as keyof object]: addApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(historyApi.middleware)
      .concat(addApi.middleware),
})
