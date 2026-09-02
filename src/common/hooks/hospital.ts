import apiV2, { API_URL } from 'api/v2'
import { useAuthState } from 'common/state/auth.state'
import { HospitalProfile, SignatureMeta } from 'common/types/manage.types'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

/**
 * The hospital principal's own self-service surface on the drugbin-cf Worker (docs/19):
 * GET /profile, POST /password, GET|PUT|DELETE /signature. Mirrors the pattern in `admin.ts`.
 */

const fetcher = <T>(url: string) => apiV2.get<T>(url).then((r) => r.data)

export const useHospitalProfile = () => {
  const { data, error, isLoading, mutate } = useSWR<HospitalProfile>(
    '/api/v1/hospital/profile',
    fetcher,
  )
  return { profile: data, isLoading, isError: !!error, mutate }
}

/** 204 on success; 401 wrong current password; 400 too short; 422 unchanged; 429 rate-limited. */
export const changeHospitalPassword = (currentPassword: string, newPassword: string) =>
  apiV2.post('/api/v1/hospital/password', { currentPassword, newPassword }).then((r) => r.data)

export const putHospitalSignature = (image: Blob) => {
  const form = new FormData()
  form.append('image', image, 'signature.png')
  return apiV2.put<SignatureMeta>('/api/v1/hospital/signature', form).then((r) => r.data)
}

export const deleteHospitalSignature = () =>
  apiV2.delete('/api/v1/hospital/signature').then((r) => r.data)

/**
 * The signature image is a credentialed asset -- <img src> cannot carry the bearer token. Fetch it
 * as a blob and hand back an object URL (the `useImageBlob` pattern in `admin.ts`). `version` is a
 * cache-buster the caller bumps after an upload so the preview refreshes.
 */
export const useSignatureBlob = (present: boolean, version = 0) => {
  const token = useAuthState((s) => s.token)
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!present) {
      setUrl(null)
      return
    }
    let revoked: string | null = null
    let cancelled = false

    fetch(`${API_URL}/api/v1/hospital/signature`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.blob() : Promise.reject(r.status)))
      .then((blob) => {
        if (cancelled) return
        revoked = URL.createObjectURL(blob)
        setUrl(revoked)
      })
      .catch(() => {
        if (!cancelled) setUrl(null)
      })

    return () => {
      cancelled = true
      if (revoked) URL.revokeObjectURL(revoked)
    }
  }, [present, version, token])

  return url
}
