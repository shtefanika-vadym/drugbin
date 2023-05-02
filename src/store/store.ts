import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { modalReducer } from 'common/state/modalSlice'

import { addApi } from 'features/AddNew/store/api/addApi'
import { authApi } from 'features/Auth'
import { historyApi } from 'features/History/store/api/productApi'
import { homeApi } from 'features/Home'
import { homeSlice } from 'features/Home/state/slices/homeSlice'
import { recycleSlice } from 'features/Recycle/slices/recycleSlice'
import { statusApi } from 'features/Status/state/api/statusApi'

const rootReducer = combineReducers({
  modal: modalReducer,
  homeReducer: homeSlice.reducer,
  recycleReducer: recycleSlice.reducer,
  [homeApi.reducerPath as keyof object]: homeApi.reducer,
  [authApi.reducerPath as keyof object]: authApi.reducer,
  [historyApi.reducerPath as keyof object]: historyApi.reducer,
  [addApi.reducerPath as keyof object]: addApi.reducer,
  [statusApi.reducerPath as keyof object]: statusApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(historyApi.middleware)
      .concat(addApi.middleware)
      .concat(homeApi.middleware)
      .concat(statusApi.middleware),
})

setupListeners(store.dispatch)
