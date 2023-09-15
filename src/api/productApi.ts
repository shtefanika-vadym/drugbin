import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'
import { DEFAULT_PAGE_SIZE } from 'common/config'
import { HTTP_METHODS } from 'common/constants/httpMethodsConstants'
import { REDUCER_CONSTANTS } from 'common/constants/reducerConstants'
import type { CollectParser } from 'common/interfaces/History'
import { baseQuery } from 'common/utils/fetchBaseQuery'
import { allEntry, collectAllEntry } from 'uc/historyMappers'

export const historyApi = createApi({
  reducerPath: REDUCER_CONSTANTS.HOME,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    product: build.query({
      query: () => ({
        url: `/recycle-drug/history`,
      }),
      transformResponse: (response) => {
        return allEntry(response)
      },
    }),
    collect: build.query({
      query: (pagination: number) => ({
        url: `/recycle-drug?page=${pagination}&limit=${DEFAULT_PAGE_SIZE}`,
      }),
      transformResponse: (response: CollectParser) => {
        return collectAllEntry(response)
      },
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `/expired-products/${productId}`,
        method: HTTP_METHODS.DELETE,
      }),
    }),
    companies: build.query({
      query: () => ({
        url: `/companies/pharmacies`,
      }),
    }),
  }),
})

export const {
  useProductQuery,
  useCollectQuery,
  useDeleteProductMutation,
  useCompaniesQuery,
}: any = historyApi
