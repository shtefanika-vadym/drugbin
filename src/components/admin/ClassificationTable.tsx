import useBreakpoints from 'common/hooks/useBreakpoints'
import { postBulkApprove } from 'common/hooks/admin'
import { WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { ClassificationRow } from 'common/types/manage.types'
import { Button } from 'components/ui/Button/Button'
import { Empty } from 'components/ui/Empty/Empty'
import { Table } from 'components/ui/Table/Table'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { TableRow } from 'components/ui/Table/TableRow'
import { Text } from 'components/ui/Text/Text'
import { useState } from 'react'
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
import {
  BulkBar,
  BulkNote,
  BulkSpacer,
  CatChip,
  CheckCell,
  ConfDot,
  Confidence,
  DrugCell,
  Numeric,
  SortTh,
} from './clasificari.styled'
import { TableBody, TableHeader } from './list.styled'
import { StatusTag } from './StatusTag'

/**
 * Column template for the dense "Tabel" view: a leading checkbox column plus the six shared
 * columns. Kept separate from `CLASSIFICATION_GRID` because this table adds the selection column.
 */
const GRID =
  'minmax(0, 0.3fr) minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)'

interface Props {
  items: ClassificationRow[]
  /** Row click navigates to `${linkPrefix}/${imageId}` — the classification detail. */
  linkPrefix: string
  /** `admin` principals only — hospital principals see the table without selection / bulk approve. */
  canApprove: boolean
  isLoading?: boolean
  sort: { field: 'created' | 'duration'; dir: 'asc' | 'desc' }
  onSort: (field: 'duration') => void
  /** Called after a bulk approve succeeds so the list can re-fetch. */
  onChanged: () => void
}

/**
 * Dense table view for the Clasificări list: one row per classification, a leading checkbox column
 * for `admin` principals, and a bulk-approve bar when rows are selected.
 */
export const ClassificationTable: React.FC<Props> = ({
  items,
  linkPrefix,
  canApprove,
  isLoading,
  sort,
  onSort,
  onChanged,
}) => {
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const clear = () => {
    setSelected(new Set())
    setNote('')
    setError('')
  }

  const toggle = (id: string) => {
    setNote('')
    setError('')
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const approveSelected = async () => {
    setBusy(true)
    setNote('')
    setError('')
    try {
      const { results } = await postBulkApprove(Array.from(selected))
      const ok = results.filter((r) => r.ok).length
      const fail = results.length - ok
      setSelected(new Set())
      setNote(`${ok} aprobate, ${fail} eșuate`)
      onChanged()
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Aprobarea în bloc a eșuat.')
    } finally {
      setBusy(false)
    }
  }

  const sortArrow = sort.field === 'duration' ? (sort.dir === 'asc' ? '↑' : '↓') : '↑↓'

  const allSelected = items.length > 0 && items.every((c) => selected.has(c.imageId))
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(items.map((c) => c.imageId)))

  if (!isLoading && items.length === 0) return <Empty description='Nicio clasificare.' />

  return (
    <>
      {canApprove && (selected.size > 0 || note || error) && (
        <BulkBar>
          {selected.size > 0 && <Text variant='bodyS'>{selected.size} selectate</Text>}
          {selected.size > 0 && (
            <Button size='XS' disabled={busy} onClick={approveSelected}>
              Aprobă selecția
            </Button>
          )}
          <BulkSpacer />
          {error ? (
            <Text variant='bodyXS' color={WDS_COLOR_RED}>
              {error}
            </Text>
          ) : (
            note && <BulkNote>{note}</BulkNote>
          )}
          {selected.size > 0 && (
            <Button variant='secondary' size='XS' disabled={busy} onClick={clear}>
              Anulează
            </Button>
          )}
        </BulkBar>
      )}

      <Table
        configDesktop={{ itemGridCols: GRID }}
        isLoading={isLoading}
        breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>
              {canApprove && (
                <CheckCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <input
                    type='checkbox'
                    aria-label='Selectează toate rândurile'
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                </CheckCell>
              )}
            </TableHeaderCell>
            <TableHeaderCell>Ora</TableHeaderCell>
            <TableHeaderCell>Medicament</TableHeaderCell>
            <TableHeaderCell>Categorie</TableHeaderCell>
            <TableHeaderCell>Încredere</TableHeaderCell>
            <TableHeaderCell>
              <SortTh type='button' onClick={() => onSort('duration')}>
                Durată {sortArrow}
              </SortTh>
            </TableHeaderCell>
            <TableHeaderCell>Stare</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {items.map((c) => (
            <TableRow
              key={c.imageId}
              onClick={() => navigate(`${linkPrefix}/${c.imageId}`)}>
              <TableCell>
                {canApprove ? (
                  <CheckCell
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <input
                      type='checkbox'
                      aria-label='Selectează rândul'
                      checked={selected.has(c.imageId)}
                      onChange={() => toggle(c.imageId)}
                    />
                  </CheckCell>
                ) : null}
              </TableCell>
              <TableCell label={fmtTime(c.createdAt)}>
                <Numeric>{fmtDate(c.createdAt)}</Numeric>
              </TableCell>
              <TableCell>
                <DrugCell>
                  <Text variant='bodyS'>{c.drugName || '—'}</Text>
                  {c.drugAtc && (
                    <Text variant='bodyXS' color={WDS_COLOR_GREY}>
                      {c.drugAtc}
                    </Text>
                  )}
                </DrugCell>
              </TableCell>
              <TableCell>
                <CatChip>{categoryLabel(c.drugCategory)}</CatChip>
              </TableCell>
              <TableCell>
                <Confidence>
                  <ConfDot $tone={CONFIDENCE_TONE[c.confidence] ?? 'muted'} />
                  {confidenceLabel(c.confidence)}
                </Confidence>
              </TableCell>
              <TableCell>
                <Numeric>{fmtMs(c.latencyTotalMs)}</Numeric>
              </TableCell>
              <TableCell>
                <StatusTag tone={STATUS_TONE[c.status] ?? 'muted'}>
                  {statusLabel(c.status)}
                </StatusTag>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
