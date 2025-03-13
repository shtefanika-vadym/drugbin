import { DocumentCategory, Documents } from 'components/documents/Documents'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const DocumentsPsychotropicPage = () => {
  return (
    <PageWrapper>
      <Documents type={DocumentCategory.PSYCHOLEPTIC} />
    </PageWrapper>
  )
}
