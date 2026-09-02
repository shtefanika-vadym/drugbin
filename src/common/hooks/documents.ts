import apiV2, { API_URL } from 'api/v2'
import { useAuthState } from 'common/state/auth.state'
import { DocumentType, PvRow } from 'common/types/documents.types'
import useSWR from 'swr'
import { useDataOnDemand } from './useDataOnDemand'

const fetcher = <T>(url: string): Promise<T> => apiV2.get<T>(url).then((r) => r.data)

// --------------------------------------------------------------------------- lists

export const useGetVerbalProcesEntries = (tab: DocumentType) => {
  const { data, isLoading, mutate } = useSWR<PvRow[]>(
    `/api/v1/manage/documents?tab=${tab}`,
    fetcher,
  )
  return { data, isLoading, mutate }
}

export const useSharedPv = () => {
  const { data, isLoading, mutate } = useSWR<PvRow[]>('/api/v1/manage/documents/shared', fetcher)
  return { data, isLoading, mutate }
}

export const useRemovedPv = () => {
  const { data, isLoading, mutate } = useSWR<PvRow[]>('/api/v1/manage/documents/removed', fetcher)
  return { data, isLoading, mutate }
}

/** The derived start date for the next PV of a category (the caller only picks the end date). */
export const usePvStartDate = (category?: number) => {
  const { data, isLoading, error } = useSWR<{ startDate: string }>(
    category ? `/api/v1/manage/documents/start-date?category=${category}` : null,
    fetcher,
  )
  return { startDate: data?.startDate, isLoading, isError: !!error }
}

// --------------------------------------------------------------------------- mutations

/** `startDate` is optional server-side — omit it to fall back to the derived start. */
export const createPv = (category: number, startDate: string, endDate: string) =>
  apiV2
    .post<PvRow>(`/api/v1/manage/documents?category=${category}`, { startDate, endDate })
    .then((r) => r.data)

export const sharePv = (id: string) =>
  apiV2.post<PvRow>(`/api/v1/manage/documents/${id}/share`).then((r) => r.data)

export const deletePv = (id: string) =>
  apiV2.delete<PvRow>(`/api/v1/manage/documents/${id}`).then((r) => r.data)

export const restorePv = (id: string) =>
  apiV2.post<PvRow>(`/api/v1/manage/documents/${id}/restore`).then((r) => r.data)

// --------------------------------------------------------------------------- pdf

/**
 * The PV PDF: an `<img>`/`<iframe src>` can't carry the bearer token, so fetch as a blob. Shared
 * PVs serve frozen R2 bytes; drafts render live.
 */
export const fetchDocument = async (id: string): Promise<ArrayBuffer> => {
  const token = useAuthState.getState().token
  const r = await fetch(`${API_URL}/api/v1/manage/documents/${id}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!r.ok) throw new Error(`pv pdf ${r.status}`)
  return r.arrayBuffer()
}

const objectUrlFetcher = async (id: string): Promise<string> => {
  const bytes = await fetchDocument(id)
  return URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
}

/** On-demand PV preview URL for the DocumentViewer dialog. */
export const useGetMonthlyRaport = (id: string) => {
  const { trigger, data, isMutating } = useDataOnDemand(`pv-view:${id}`, () => objectUrlFetcher(id))
  return { data, trigger, isMutating }
}
