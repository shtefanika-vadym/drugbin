import { useGetVerbalProcesEntries, useRemovedPv, useSharedPv } from 'common/hooks/documents'
import useBreakpoints from 'common/hooks/useBreakpoints'
import { DocumentType } from 'common/types/documents.types'
import { Empty } from 'components/ui/Empty/Empty'
import { Table } from 'components/ui/Table/Table'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { TableBody, TableHeader } from './Documents.styled'
import { DocumentsHeader } from './DocumentsHeader/DocumentsHeader'
import { DocumentsListRow } from './DocumentsListRow'

export type DocumentsMode = 'normal' | 'psycholeptic' | 'shared' | 'trash'

interface DocumentsProps {
  mode: DocumentsMode
}

const TAB_FOR: Record<'normal' | 'psycholeptic', DocumentType> = {
  normal: DocumentType.NORMAL,
  psycholeptic: DocumentType.PSYCHOLEPTIC,
}

const useEntries = (mode: DocumentsMode) => {
  const tab = mode === 'psycholeptic' ? DocumentType.PSYCHOLEPTIC : DocumentType.NORMAL
  const main = useGetVerbalProcesEntries(tab)
  const shared = useSharedPv()
  const removed = useRemovedPv()
  if (mode === 'shared') return shared
  if (mode === 'trash') return removed
  return main
}

export const Documents: React.FC<DocumentsProps> = ({ mode }) => {
  const { data, isLoading, mutate } = useEntries(mode)
  const breakpoints = useBreakpoints()
  const canCreate = mode === 'normal' || mode === 'psycholeptic'

  return (
    <>
      <DocumentsHeader
        showButton={canCreate}
        type={canCreate ? TAB_FOR[mode] : undefined}
        refetchDocuments={mutate}
      />
      <Table
        configDesktop={{
          itemGridCols: 'minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1.5fr)',
        }}
        isLoading={isLoading}
        breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Categorie</TableHeaderCell>
            <TableHeaderCell>Data creării</TableHeaderCell>
            <TableHeaderCell>Perioadă de timp</TableHeaderCell>
            <TableHeaderCell>Acțiuni</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {!isLoading && (!data || data.length === 0) && <Empty description='Niciun document.' />}
          {data?.map((item) => (
            <DocumentsListRow key={item.id} item={item} mode={mode} mutate={mutate} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
