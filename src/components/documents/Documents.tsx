import { useGetVerbalProcesEntries } from 'common/hooks/documents'
import useBreakpoints from 'common/hooks/useBreakpoints'
import { DocumentCategory, DocumentsVerbalProcess } from 'common/types/documents.types'
import { Empty } from 'components/ui/Empty/Empty'
import { Table } from 'components/ui/Table/Table'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { isEmpty } from 'lodash-es'
import { TableBody, TableHeader } from './Documents.styled'
import { DocumentsHeader } from './DocumentsHeader/DocumentsHeader'
import { DocumentsListRow } from './DocumentsListRow'

interface DocumentsProps {
  type: DocumentCategory
}

// TODO: Add pagination
export const Documents: React.FC<DocumentsProps> = ({ type }) => {
  const { data, isLoading, mutate } = useGetVerbalProcesEntries(type)
  const breakpoints = useBreakpoints()

  return (
    <>
      <DocumentsHeader showButton type={type} refetchDocuments={mutate} />
      <Table
        configDesktop={{
          itemGridCols: 'minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1.5fr)',
        }}
        isLoading={isLoading}
        breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Nume</TableHeaderCell>
            <TableHeaderCell>Data creării</TableHeaderCell>
            <TableHeaderCell>Perioadă de timp</TableHeaderCell>
            <TableHeaderCell>Acțiuni</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderTableBody(data, type)}</TableBody>
      </Table>
    </>
  )
}

const renderTableBody = (data: DocumentsVerbalProcess[], type: DocumentCategory) => {
  if (isEmpty(data)) return <Empty />

  return (
    <TableBody>
      {data?.map((item) => {
        return <DocumentsListRow item={item} documentType={type} />
      })}
    </TableBody>
  )
}
export { DocumentCategory }

