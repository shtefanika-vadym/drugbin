import { useDocumentsTrashedQuery } from 'api/documentsApi'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsDocumentsTrash } from 'components/ui/CustomTable/TableColumns'

export const Trash = () => {
  const { data, isLoading } = useDocumentsTrashedQuery({})
  return <CustomTable columns={columnsDocumentsTrash} dataSource={data} isLoading={isLoading} />
}
