import { useDocumentsSharedQuery } from 'api/documentsApi'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsDocumentsShared } from 'components/ui/CustomTable/TableColumns'

export const Shared = () => {
  const { data, isLoading } = useDocumentsSharedQuery({})
  return <CustomTable columns={columnsDocumentsShared} dataSource={data} isLoading={isLoading} />
}
