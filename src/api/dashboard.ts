import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'
import { DashboardResponse } from 'common/interfaces/Dashboard'

import { baseQuery } from 'common/utils/fetchBaseQuery'

export const dashboardApi = createApi({
  reducerPath: 'dashboard',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getDashboard: build.query<DashboardResponse, number>({
      query: (date: number) => ({
        url: `/dashboard/${date}`,
      }),
    }),
  }),
})

export const { useGetDashboardQuery } = dashboardApi
