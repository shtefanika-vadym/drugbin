import { DocumentsHeader } from 'components/documents/DocumentsHeader/DocumentsHeader'
import { VerbalProcess } from 'components/documents/VerbalProcess/VerbalProcess'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

export const DocumentsPVPage = () => {
  return (
    <PageWrapper>
      <DocumentsHeader showButton={true} type={'normal'}/>
      <VerbalProcess />
    </PageWrapper>
  )
}
