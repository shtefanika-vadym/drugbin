import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { HTTP_METHODS } from 'common/constants/httpMethodsConstants'
import { baseQuery } from 'common/utils/fetchBaseQuery'

export const landingApi = createApi({
  reducerPath: 'contact',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    contact: build.mutation({
      query: (product) => ({
        url: '/contact-us',
        data: product,
        method: HTTP_METHODS.POST,
      }),
    }),
  }),
})

export const { useContactMutation }: any = landingApi
