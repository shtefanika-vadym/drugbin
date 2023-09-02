import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { modalReducer } from 'common/state/modalSlice'

import { addApi } from 'api/addApi'
import { recycleSlice } from 'features/Collect/slices/recycleSlice'
import { recycleApi } from 'api/recycleApi'
import { historyApi } from 'api/productApi'
import { homeApi } from 'features/Home'
import { homeSlice } from 'features/Home/state/slices/homeSlice'
import { landingApi } from 'features/LandingPage/store/api/landingApi'
import { statusApi } from 'api/statusApi'
import { authApi } from 'components/login/store/api/authApi'

const rootReducer = combineReducers({
  modal: modalReducer,
  homeReducer: homeSlice.reducer,
  recycleReducer: recycleSlice.reducer,
  [homeApi.reducerPath as keyof object]: homeApi.reducer,
  [authApi.reducerPath as keyof object]: authApi.reducer,
  [historyApi.reducerPath as keyof object]: historyApi.reducer,
  [addApi.reducerPath as keyof object]: addApi.reducer,
  [statusApi.reducerPath as keyof object]: statusApi.reducer,
  [recycleApi.reducerPath as keyof object]: recycleApi.reducer,
  [landingApi.reducerPath as keyof object]: landingApi.reducer,
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
      .concat(statusApi.middleware)
      .concat(recycleApi.middleware)
      .concat(landingApi.middleware),
})

setupListeners(store.dispatch)
