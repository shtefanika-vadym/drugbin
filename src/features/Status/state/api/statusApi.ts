import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'common/utils/fetchBaseQuery'

export const statusApi = createApi({
  reducerPath: 'status',
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    pharmaDetails: build.query({
      query: (id: string) => ({
        url: `/companies/pharmacies/${id}`,
      }),
    }),
  }),
})

export const { usePharmaDetailsQuery }: any = statusApi
