import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'
import type { VerbalProcesData } from 'common/interfaces/HistoryTypes'

import { baseQuery } from 'common/utils/fetchBaseQuery'
import { verbalProcessData } from 'uc/historyMappers'

export const statusApi = createApi({
  reducerPath: 'status',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    collectStatus: build.query({
      query: (id: string) => ({
        url: `recycle/verbal-process/${id}`,
      }),
      transformResponse: (response): VerbalProcesData => {
        return verbalProcessData(response)
      },
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
        url: `recycle/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
})

export const { useCollectStatusQuery, useUpdateStatusMutation, useDocumentStatusQuery }: any =
  statusApi
