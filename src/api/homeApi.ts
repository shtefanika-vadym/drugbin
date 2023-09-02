import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { REDUCER_CONSTANTS } from 'common/constants/reducerConstants'
import { baseQuery } from 'common/utils/fetchBaseQuery'

export const homeApi = createApi({
  reducerPath: REDUCER_CONSTANTS.HOME,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    fetchSome: build.query({
      query: () => ({
        url: `/expired-products`,
      }),
    }),
  }),
})

export const { useLazyFetchSomeQuery }: any = homeApi
