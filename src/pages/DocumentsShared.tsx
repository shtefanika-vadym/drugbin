import { DocumentsHeader } from 'components/documents/DocumentsHeader/DocumentsHeader'
import { Shared } from 'components/documents/Shared/Shared'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const DocumentsSharedPage = () => {
  return (
    <PageWrapper>
      <DocumentsHeader />
      <Shared />
    </PageWrapper>
  )
}
