import { PvRow } from 'common/types/documents.types'
import { categoryLabels } from 'common/utils/utils'
import { StatusTag } from 'components/admin/StatusTag'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { DocumentsActionCell } from './DocumentsActionCell'
import type { DocumentsMode } from './Documents'

interface DocumentsListRowProps {
  item: PvRow
  mode: DocumentsMode
  mutate: () => void
}

const p2 = (n: number) => String(n).padStart(2, '0')
const fmtDate = (ms: number) => {
  const d = new Date(ms)
  return `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}`
}
const fmtTime = (ms: number) => {
  const d = new Date(ms)
  return `${p2(d.getHours())}:${p2(d.getMinutes())}`
}

export const DocumentsListRow: React.FC<DocumentsListRowProps> = ({ item, mode, mutate }) => {
  const label = categoryLabels[item.category] ?? `Categoria ${item.category}`
  return (
    <TableRow>
      <TableCell label={item.id} isCopy>
        {label}
      </TableCell>
      <TableCell label={fmtTime(item.createdAt)}>{fmtDate(item.createdAt)}</TableCell>
      <TableCell>
        {item.startDate} — {item.endDate}
        {item.sharedAt ? <StatusTag tone='ok'>Trimis</StatusTag> : null}
      </TableCell>
      <TableCell>
        <DocumentsActionCell id={item.id} shared={!!item.sharedAt} mode={mode} mutate={mutate} />
      </TableCell>
    </TableRow>
  )
}
