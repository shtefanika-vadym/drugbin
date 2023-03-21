import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { HTTP_METHODS } from 'common/constants/httpMethodsConstants'
import { REDUCER_CONSTANTS } from 'common/constants/reducerConstants'
import { baseQuery } from 'common/utils/fetchBaseQuery'

export const authApi = createApi({
  reducerPath: REDUCER_CONSTANTS.AUTH,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    login: build.mutation({
      query: (user) => ({
        url: '/login',
        data: user,
        method: HTTP_METHODS.POST,
      }),
    }),
    register: build.mutation({
      query: (user) => ({
        url: '/register',
        data: user,
        method: HTTP_METHODS.POST,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation }: any = authApi
