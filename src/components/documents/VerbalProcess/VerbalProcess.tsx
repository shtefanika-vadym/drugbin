import { useDocumentsQuery } from 'api/documentsApi'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsDocumentsPV } from 'components/ui/CustomTable/TableColumns'

export const VerbalProcess = () => {
  const { data, isLoading } = useDocumentsQuery('normal')

  return <CustomTable columns={columnsDocumentsPV} dataSource={data} isLoading={isLoading} />
}
