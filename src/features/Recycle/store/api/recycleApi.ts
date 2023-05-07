import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { HTTP_METHODS } from 'common/constants/httpMethodsConstants'
import { baseQuery } from 'common/utils/fetchBaseQuery'

export const recycleApi = createApi({
  reducerPath: 'recycle',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    recycleDrug: build.mutation({
      query: (product) => ({
        url: '/recycle-drug',
        data: product,
        method: HTTP_METHODS.POST,
      }),
    }),
  }),
})

export const { useRecycleDrugMutation }: any = recycleApi
