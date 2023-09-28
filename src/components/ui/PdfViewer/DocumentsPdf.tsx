import { useDocumentsPdfDataQuery } from 'api/documentsApi'
import { PdfLayout } from './PdfLayout'

const type = 'normal'

export const DocumentsPdf: React.FC<{ id: string }> = ({ id }) => {
  const { data } = useDocumentsPdfDataQuery({ type: type, id: id })

  console.log('data', data)

  return (
    <PdfLayout>
      <div>Data</div>
    </PdfLayout>
  )
}
