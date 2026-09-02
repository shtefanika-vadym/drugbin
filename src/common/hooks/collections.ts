import apiV2 from 'api/v2'
import { ClassificationRow, Page } from 'common/types/manage.types'
import useSWR from 'swr'

import { PAGE_SIZE } from './admin'

/**
 * Read-model hooks for the collections viewer (drugbin-cf: a collection is one machine drop-off
 * session grouping the classifications made between `open` and `finalize`). Mirrors
 * `useClassifications` / `useClassification` in `./admin` — same query-string building, same
 * `useSWR` wiring, same return shapes.
 */

const fetcher = <T>(url: string) => apiV2.get<T>(url).then((r) => r.data)

const qs = (params: Record<string, string | number | undefined>) => {
  const s = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') s.set(k, String(v))
  })
  const str = s.toString()
  return str ? `?${str}` : ''
}

const pageCount = (data?: Page) =>
  data && data.pageSize ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1

export interface CollectionRow {
  id: string
  machineId: string
  hospitalId: string | null
  status: 'open' | 'finalized'
  startedAt: number
  finalizedAt: number | null
  itemCount: number
}

export interface CollectionList extends Page {
  items: CollectionRow[]
}

export interface CollectionDetailResponse {
  collection: CollectionRow
  items: ClassificationRow[]
}

export interface CollectionFilters {
  status?: 'open' | 'finalized'
  machineId?: string
  hospitalId?: string
  since?: number
  until?: number
}

// --------------------------------------------------------------------------- collections

export const useCollections = (filters: CollectionFilters, page = 1, pageSize = PAGE_SIZE) => {
  const { data, error, isLoading, mutate } = useSWR<CollectionList>(
    `/api/v1/manage/collections${qs({ ...filters, page, pageSize })}`,
    fetcher,
  )
  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: pageCount(data),
    isLoading,
    isError: !!error,
    /** Manual re-fetch for the refresh button. */
    refresh: () => mutate(),
  }
}

export const useCollection = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<CollectionDetailResponse>(
    id ? `/api/v1/manage/collections/${id}` : null,
    fetcher,
    {
      // An open collection keeps gaining items as the machine drops more meds in; a freshly opened
      // one may also not be visible for a beat. Keep polling every 2s until it is finalized, then
      // stop — same safety-net shape as `useClassification`.
      shouldRetryOnError: true,
      errorRetryInterval: 2000,
      errorRetryCount: 10,
      refreshInterval: (latest) => (latest && latest.collection.status === 'finalized' ? 0 : 2000),
    },
  )
  return {
    collection: data?.collection,
    items: data?.items ?? [],
    isLoading,
    isError: !!error,
    mutate,
  }
}
