import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'common/utils/fetchBaseQuery'

export const statusApi = createApi({
  reducerPath: 'status',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    updateStatus: build.mutation({
      query: (id) => ({
        url: `recycle/${id}`,
        method: 'PATCH',
      }),
    }),
    deleteStatus: build.mutation({
      query: (id) => ({
        url: `recycle/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useUpdateStatusMutation, useDeleteStatusMutation } = statusApi
