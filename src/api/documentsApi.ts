import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'
import type { DocumentsVerbalProces } from 'common/interfaces/DocumentsProps'

import { baseQuery } from 'common/utils/fetchBaseQuery'
import { toDocumentsVerbalProces } from 'uc/historyMappers'

export const documentsApi = createApi({
  reducerPath: 'documents',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    documents: build.query({
      query: (type) => ({
        url: `/documents/${type}`,
      }),
      transformResponse: (response: DocumentsVerbalProces[]) => {
        return toDocumentsVerbalProces(response)
      },
    }),
    documentsShared: build.query({
      query: () => ({
        url: `/documents/shared`,
      }),
      transformResponse: (response: DocumentsVerbalProces[]) => {
        return toDocumentsVerbalProces(response)
      },
    }),
    documentsTrashed: build.query({
      query: () => ({
        url: `/documents/removed`,
      }),
      transformResponse: (response: DocumentsVerbalProces[]) => {
        return toDocumentsVerbalProces(response)
      },
    }),
  }),
})

export const { useDocumentsQuery, useDocumentsSharedQuery, useDocumentsTrashedQuery }: any =
  documentsApi
