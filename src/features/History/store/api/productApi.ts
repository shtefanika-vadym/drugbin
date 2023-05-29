import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { HTTP_METHODS } from 'common/constants/httpMethodsConstants'
import { REDUCER_CONSTANTS } from 'common/constants/reducerConstants'
import { baseQuery } from 'common/utils/fetchBaseQuery'

export const historyApi = createApi({
  reducerPath: REDUCER_CONSTANTS.HOME,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    product: build.query({
      query: () => ({
        url: `/recycle-drug/history`,
      }),
    }),
    recycle: build.query({
      query: () => ({
        url: `/recycle-drug`,
      }),
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
  useRecycleQuery,
  useDeleteProductMutation,
  useCompaniesQuery,
}: any = historyApi
