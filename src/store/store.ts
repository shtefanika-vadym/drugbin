import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { dashboardApi } from 'api/dashboard'
import { documentsApi } from 'api/documentsApi'
import { managementApi } from 'api/management'
import { statusApi } from 'api/statusApi'
import { authApi } from 'components/login/store/api/authApi'

const rootReducer = combineReducers({
  [authApi.reducerPath as keyof object]: authApi.reducer,
  [statusApi.reducerPath as keyof object]: statusApi.reducer,
  [documentsApi.reducerPath as keyof object]: documentsApi.reducer,
  [managementApi.reducerPath as keyof object]: managementApi.reducer,
  [dashboardApi.reducerPath as keyof object]: dashboardApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(statusApi.middleware)
      .concat(documentsApi.middleware)
      .concat(managementApi.middleware)
      .concat(dashboardApi.middleware),
})

setupListeners(store.dispatch)
