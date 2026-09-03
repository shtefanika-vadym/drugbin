import { ClassificationRow } from 'common/types/manage.types'
import { Empty } from 'components/ui/Empty/Empty'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { useNavigate } from 'react-router-dom'
import {
  CONFIDENCE_TONE,
  STATUS_TONE,
  categoryLabel,
  confidenceLabel,
  fmtDate,
  fmtMs,
  fmtTime,
  statusLabel,
} from './format'
import { StatusTag } from './StatusTag'

/** Column template shared by every screen that renders the classification-rows table. */
export const CLASSIFICATION_GRID =
  'minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)'

/** The six header cells for the classification-rows table, in column order. */
export const ClassificationHeaderCells: React.FC = () => (
  <>
    <TableHeaderCell>Data</TableHeaderCell>
    <TableHeaderCell>Medicament</TableHeaderCell>
    <TableHeaderCell>Categorie</TableHeaderCell>
    <TableHeaderCell>Încredere</TableHeaderCell>
    <TableHeaderCell>Durată</TableHeaderCell>
    <TableHeaderCell>Stare</TableHeaderCell>
  </>
)

interface Props {
  items: ClassificationRow[]
  /** Row click navigates to `${linkPrefix}/${imageId}` — the classification detail. */
  linkPrefix: string
  isLoading?: boolean
  emptyDescription?: string
  /** Opt-in: make rows keyboard-focusable + Enter/Space activatable. Off for the admin list. */
  keyboardActivatable?: boolean
}

/**
 * The classification-rows table body — date, drug, category, confidence, duration, status. Shared by
 * the "Clasificări" list and the collection detail page so the columns never drift.
 */
export const ClassificationRows: React.FC<Props> = ({
  items,
  linkPrefix,
  isLoading = false,
  emptyDescription = 'Nicio clasificare.',
  keyboardActivatable = false,
}) => {
  const navigate = useNavigate()
  if (!isLoading && items.length === 0) return <Empty description={emptyDescription} />
  return (
    <>
      {items.map((c) => (
        <TableRow
          key={c.imageId}
          keyboardActivatable={keyboardActivatable}
          onClick={() => navigate(`${linkPrefix}/${c.imageId}`)}>
          <TableCell label={fmtTime(c.createdAt)}>{fmtDate(c.createdAt)}</TableCell>
          <TableCell label={c.drugAtc || undefined}>{c.drugName || '—'}</TableCell>
          <TableCell>{categoryLabel(c.drugCategory)}</TableCell>
          <TableCell>
            <StatusTag tone={CONFIDENCE_TONE[c.confidence] ?? 'muted'}>
              {confidenceLabel(c.confidence)}
            </StatusTag>
          </TableCell>
          <TableCell>{fmtMs(c.latencyTotalMs)}</TableCell>
          <TableCell>
            <StatusTag tone={STATUS_TONE[c.status] ?? 'muted'}>{statusLabel(c.status)}</StatusTag>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
