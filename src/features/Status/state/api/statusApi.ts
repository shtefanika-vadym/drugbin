import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'common/utils/fetchBaseQuery'

export const statusApi = createApi({
  reducerPath: 'status',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    collectStatus: build.query<File, string>({
      query: (id: string) => ({
        url: `recycle-drug/verbal-process/${id}`,
        responseType: 'arraybuffer',
        headers: {
          'Database-Connection': 'connection',
          'Content-Type': 'application/pdf',
          Accept: 'application/pdf',
        },
      }),
    }),
    documentStatus: build.query<File, string>({
      query: () => ({
        url: `recycle-drug/audit`,
        responseType: 'arraybuffer',
        headers: {
          'Database-Connection': 'connection',
          'Content-Type': 'application/pdf',
          Accept: 'application/pdf',
        },
      }),
    }),
    updateStatus: build.mutation({
      query: (id) => ({
        url: `recycle-drug/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
})

export const { useCollectStatusQuery, useUpdateStatusMutation, useDocumentStatusQuery }: any =
  statusApi
