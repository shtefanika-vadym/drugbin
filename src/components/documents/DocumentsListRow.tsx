import { DocumentType, DocumentsVerbalProcess } from 'common/types/documents.types'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { DocumentsActionCell } from './DocumentsActionCell'

interface DocumentsListRowProps {
  item: DocumentsVerbalProcess
  documentType: DocumentType
}

export const DocumentsListRow: React.FC<DocumentsListRowProps> = ({ item, documentType }) => {
  return (
    <TableRow>
      <TableCell label={item.documentId} isCopy>Raport Medicamente</TableCell>
      <TableCell label={item.createAt.time}>{item.createAt.data}</TableCell>
      <TableCell>
        {item.period.startDate} - {item.period.endDate}
      </TableCell>
      <TableCell>
        <DocumentsActionCell id={item.documentId} documentType={documentType} />
      </TableCell>
    </TableRow>
  )
}

