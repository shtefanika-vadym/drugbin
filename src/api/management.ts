import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'
import type { ManagementParser, ManagementResponse } from 'common/interfaces/ManagementTypes'

import { baseQuery } from 'common/utils/fetchBaseQuery'
import { toManagementEntry } from 'uc/mappers'

export const managementApi = createApi({
  reducerPath: 'management',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getEntries: build.query({
      query: (page: number) => ({
        url: `/recycle?page=${page}&limit=10`,
      }),
      transformResponse: (response: ManagementParser): ManagementResponse => {
        return toManagementEntry(response)
      },
    }),
    getEntriesSearch: build.query({
      query: ({ search, page }) => ({
        url: `/recycle/search/${search}?page=${page}&limit=10`,
      }),
      transformResponse: (response: ManagementParser): ManagementResponse => {
        return toManagementEntry(response)
      },
    }),
  }),
})

export const { useGetEntriesQuery, useGetEntriesSearchQuery } = managementApi
