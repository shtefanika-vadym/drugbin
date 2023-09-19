import { DocumentsHeader } from 'components/documents/DocumentsHeader/DocumentsHeader'
import { Trash } from 'components/documents/Trash/Trash'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const DocumentsTrashPage = () => {
  return (
    <PageWrapper>
      <DocumentsHeader />
      <Trash />
    </PageWrapper>
  )
}
