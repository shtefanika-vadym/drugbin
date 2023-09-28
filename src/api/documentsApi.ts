import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'
import { HTTP_METHODS } from 'common/constants/httpMethodsConstants'
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
    documentsLastDate: build.query({
      query: (type) => ({
        url: `/documents/${type}/last-date`,
      }),
    }),
    documentsPdfData: build.query({
      query: ({ type, id }) => ({
        url: `/documents/data/${type}/${id}`,
      }),
    }),
    documentsGenerate: build.mutation({
      query: (data) => ({
        url: `/documents/${data.type}`,
        data: data.timePeriod,
        method: HTTP_METHODS.POST,
      }),
    }),
  }),
})

export const {
  useDocumentsQuery,
  useDocumentsSharedQuery,
  useDocumentsTrashedQuery,
  useDocumentsLastDateQuery,
  useDocumentsPdfDataQuery,
  useDocumentsGenerateMutation,
}: any = documentsApi
