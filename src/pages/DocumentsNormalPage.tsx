import { DocumentCategory, Documents } from 'components/documents/Documents'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const DocumentsNormalPage = () => {
  return (
    <PageWrapper>
      <Documents type={DocumentCategory.USUAL} />
    </PageWrapper>
  )
}
