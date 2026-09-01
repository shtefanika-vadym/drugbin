import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * List-screen state that lives in the URL query string, so a refresh (or a shared link) restores
 * the page, the search term and any filters. `page` is 1-based; page 1 and empty values are kept
 * out of the URL to keep it clean. History entries are replaced, not pushed, so the back button
 * doesn't step through every keystroke.
 */
export const useListQuery = () => {
  const [params, setParams] = useSearchParams()

  const patch = useCallback(
    (changes: Record<string, string | null>, resetPage = false) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(changes).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
          if (resetPage) next.delete('page')
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  return {
    page: Number(params.get('page')) || 1,
    search: params.get('q') ?? '',
    /** Rows per page. Default 10; kept out of the URL when it's the default. */
    pageSize: Number(params.get('size')) || 10,
    setPage: (p: number) => patch({ page: p > 1 ? String(p) : null }),
    setSearch: (s: string) => patch({ q: s || null }, true),
    setPageSize: (n: number) => patch({ size: n !== 10 ? String(n) : null }, true),
    getFilter: (key: string) => params.get(key) ?? '',
    setFilter: (key: string, value: string) => patch({ [key]: value || null }, true),
  }
}
