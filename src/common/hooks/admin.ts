import apiV2, { API_URL } from 'api/v2'
import { useAuthState } from 'common/state/auth.state'
import {
  ClassificationDetail,
  ClassificationList,
  CredentialsResponse,
  Hospital,
  HospitalList,
  Machine,
  MachineKeyResponse,
  MachineList,
  Page,
  ReclassifyResponse,
  SimulateResult,
} from 'common/types/manage.types'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

/** Default rows per page on every admin list screen (the UI lets the user pick 10/20/30). */
export const PAGE_SIZE = 10

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

interface ListParams {
  page?: number
  search?: string
  /** Override the default page size — used by the dropdowns that need the full list. */
  pageSize?: number
}

// --------------------------------------------------------------------------- hospitals

export const useHospitals = ({ page = 1, search = '', pageSize = PAGE_SIZE }: ListParams = {}) => {
  const { data, error, isLoading, mutate } = useSWR<HospitalList>(
    `/api/v1/admin/hospitals${qs({ search, page, pageSize })}`,
    fetcher,
  )
  return {
    hospitals: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: pageCount(data),
    isLoading,
    isError: !!error,
    mutate,
  }
}

export const useHospital = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR<Hospital>(
    id ? `/api/v1/admin/hospitals/${id}` : null,
    fetcher,
  )
  return { hospital: data, isLoading, isError: !!error, mutate }
}

export const createHospital = (body: Record<string, unknown>) =>
  apiV2.post<CredentialsResponse>('/api/v1/admin/hospitals', body).then((r) => r.data)

export const updateHospital = (id: string, body: Record<string, unknown>) =>
  apiV2.patch<Hospital>(`/api/v1/admin/hospitals/${id}`, body).then((r) => r.data)

export const rotateHospitalCredentials = (id: string) =>
  apiV2
    .post<CredentialsResponse>(`/api/v1/admin/hospitals/${id}/rotate-credentials`)
    .then((r) => r.data)

export const setHospitalStatus = (id: string, status: 'active' | 'suspended') =>
  apiV2.post<Hospital>(`/api/v1/admin/hospitals/${id}/status`, { status }).then((r) => r.data)

export const deleteHospital = (id: string) =>
  apiV2
    .delete<{ success: true; unassignedMachines: number }>(`/api/v1/admin/hospitals/${id}`)
    .then((r) => r.data)

// --------------------------------------------------------------------------- machines

export const useMachines = ({
  page = 1,
  search = '',
  pageSize = PAGE_SIZE,
  hospitalId,
}: ListParams & { hospitalId?: string } = {}) => {
  const { data, error, isLoading, mutate } = useSWR<MachineList>(
    `/api/v1/admin/machines${qs({ search, hospitalId, page, pageSize })}`,
    fetcher,
  )
  return {
    machines: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: pageCount(data),
    isLoading,
    isError: !!error,
    mutate,
  }
}

export const createMachine = (body: Record<string, unknown>) =>
  apiV2.post<MachineKeyResponse>('/api/v1/admin/machines', body).then((r) => r.data)

export const updateMachine = (id: string, body: Record<string, unknown>) =>
  apiV2.patch<Machine>(`/api/v1/admin/machines/${id}`, body).then((r) => r.data)

export const assignMachine = (id: string, hospitalId: string | null) =>
  apiV2.post<Machine>(`/api/v1/admin/machines/${id}/assign`, { hospitalId }).then((r) => r.data)

export const rotateMachineKey = (id: string) =>
  apiV2.post<MachineKeyResponse>(`/api/v1/admin/machines/${id}/rotate-key`).then((r) => r.data)

export const setMachineStatus = (id: string, enabled: boolean) =>
  apiV2.post<Machine>(`/api/v1/admin/machines/${id}/status`, { enabled }).then((r) => r.data)

export const deleteMachine = (id: string) =>
  apiV2.delete<{ success: true }>(`/api/v1/admin/machines/${id}`).then((r) => r.data)

/** Run the real classify pipeline on an uploaded image — anonymously, or attributed to a robot. */
export const simulateClassification = (image: File, machineId?: string) => {
  const form = new FormData()
  form.append('image', image)
  if (machineId) form.append('machineId', machineId)
  return apiV2.post<SimulateResult>('/api/v1/admin/simulate', form).then((r) => r.data)
}

// --------------------------------------------------------------------------- classifications

export interface ClassificationFilters {
  tier?: string
  status?: string
  category?: string
  confidence?: string
  sort?: string
  dir?: string
  machineId?: string
  since?: number
  until?: number
}

export const useClassifications = (
  filters: ClassificationFilters,
  page = 1,
  pageSize = PAGE_SIZE,
) => {
  const { data, error, isLoading, mutate } = useSWR<ClassificationList>(
    `/api/v1/manage/classifications${qs({ ...filters, page, pageSize })}`,
    fetcher,
  )
  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    counts: data?.counts ?? { pending: 0, approved: 0, total: 0 },
    totalPages: pageCount(data),
    isLoading,
    isError: !!error,
    /** Manual re-fetch for the refresh button. */
    refresh: () => mutate(),
  }
}

export const useClassification = (imageId?: string) => {
  const { data, error, isLoading, mutate } = useSWR<ClassificationDetail>(
    imageId ? `/api/v1/manage/classifications/${imageId}` : null,
    fetcher,
    {
      // The simulate route writes the row synchronously, so the page normally has it on first
      // fetch. This is the safety net for the rare case the row is not there yet (a fresh classify
      // whose tail hasn't run): keep retrying every 2s until it appears, then stop.
      shouldRetryOnError: true,
      errorRetryInterval: 2000,
      errorRetryCount: 10,
      refreshInterval: (latest) => (latest ? 0 : 2000),
    },
  )
  return { detail: data, isLoading, isError: !!error, mutate }
}

export const postApprove = (imageId: string, body?: Record<string, unknown>) =>
  apiV2
    .post<{ success: true; corrected: boolean; indexed: boolean }>(
      `/api/v1/manage/classifications/${imageId}/approve`,
      body ?? {},
    )
    .then((r) => r.data)

export const postUnapprove = (imageId: string) =>
  apiV2
    .post<{ success: true }>(`/api/v1/manage/classifications/${imageId}/unapprove`)
    .then((r) => r.data)

export const postBulkApprove = (imageIds: string[]) =>
  apiV2
    .post<{ results: { imageId: string; ok: boolean; indexed?: boolean; error?: string }[] }>(
      '/api/v1/manage/classifications/bulk-approve',
      { imageIds },
    )
    .then((r) => r.data)

/** Hard delete: the row, its corrections, both R2 images, the vector and the tier-0 cache key. */
export const deleteClassification = (imageId: string) =>
  apiV2.delete<{ success: true }>(`/api/v1/manage/classifications/${imageId}`).then((r) => r.data)

export const postReclassify = (imageId: string) =>
  apiV2
    .post<ReclassifyResponse>(`/api/v1/manage/classifications/${imageId}/reclassify`)
    .then((r) => r.data)

/**
 * The archived image is a credentialed cross-origin asset -- <img src> cannot send the bearer
 * token. Fetch it as a blob and hand back an object URL. Retries a few times on 404: a freshly
 * classified image is archived to R2 by the async tail a beat after the row exists (simulate
 * pre-puts it, but a real classify does not).
 */
export const useImageBlob = (imageId?: string, variant: 'norm' | 'raw' = 'norm') => {
  const token = useAuthState((s) => s.token)
  const [url, setUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!imageId) return
    let revoked: string | null = null
    let cancelled = false
    setFailed(false)
    setUrl(null)

    const attempt = async (tries: number): Promise<void> => {
      const r = await fetch(
        `${API_URL}/api/v1/manage/classifications/${imageId}/image?variant=${variant}`,
        { headers: { Authorization: `Bearer ${token}` } },
      ).catch(() => null)
      if (cancelled) return
      if (r && r.ok) {
        revoked = URL.createObjectURL(await r.blob())
        if (!cancelled) setUrl(revoked)
        return
      }
      if (r && r.status === 404 && tries > 0) {
        await new Promise((res) => setTimeout(res, 1500))
        if (!cancelled) return attempt(tries - 1)
      }
      if (!cancelled) setFailed(true)
    }

    attempt(8)
    return () => {
      cancelled = true
      if (revoked) URL.revokeObjectURL(revoked)
    }
  }, [imageId, variant, token])

  return { url, failed }
}
