import { useDocumentsQuery } from 'api/documentsApi'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsDocumentsPV } from 'components/ui/CustomTable/TableColumns'

export const Psychotropic = () => {
  const { data, isLoading } = useDocumentsQuery('psycholeptic')
  return <CustomTable columns={columnsDocumentsPV} dataSource={data} isLoading={isLoading} />
}
