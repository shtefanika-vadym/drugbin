import { DocumentsHeader } from 'components/documents/DocumentsHeader/DocumentsHeader'
import { Psychotropic } from 'components/documents/Psychotropic/Psychotropic'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const PsychotropicPage = () => {
  return (
    <PageWrapper>
      <DocumentsHeader showButton={true} />
      <Psychotropic />
    </PageWrapper>
  )
}
