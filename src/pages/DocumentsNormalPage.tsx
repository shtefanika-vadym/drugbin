import { DocumentType } from 'common/types/documents'
import { Documents } from 'components/documents/Documents'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const DocumentsNormalPage = () => {
  return (
    <PageWrapper>
      <Documents type={DocumentType.NORMAL} />
    </PageWrapper>
  )
}
