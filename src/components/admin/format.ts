import { DRUG_CATEGORY_LABELS } from 'common/types/manage.types'
import { StatusTone } from 'components/admin/StatusTag.styled'

const p2 = (n: number) => n.toString().padStart(2, '0')

export const fmtDate = (ms: number | null | undefined): string => {
  if (!ms) return '—'
  const d = new Date(ms)
  return `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}`
}

export const fmtTime = (ms: number | null | undefined): string => {
  if (!ms) return '—'
  const d = new Date(ms)
  return `${p2(d.getHours())}:${p2(d.getMinutes())}`
}

export const fmtDateTime = (ms: number | null | undefined): string =>
  !ms ? '—' : `${fmtDate(ms)} ${fmtTime(ms)}`

export const fmtMs = (ms: number | null | undefined): string =>
  ms == null ? '—' : ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms} ms`

export const fmtRelative = (ms: number | null | undefined): string => {
  if (!ms) return 'niciodată'
  const diff = Date.now() - ms
  const min = Math.round(diff / 60000)
  if (min < 1) return 'acum'
  if (min < 60) return `acum ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `acum ${h} h`
  return `acum ${Math.round(h / 24)} z`
}

export const categoryLabel = (c: number | null | undefined): string =>
  c == null ? '—' : DRUG_CATEGORY_LABELS[c] ?? `#${c}`

export const CONFIDENCE_TONE: Record<string, StatusTone> = {
  high: 'ok',
  low: 'warn',
  none: 'muted',
}
