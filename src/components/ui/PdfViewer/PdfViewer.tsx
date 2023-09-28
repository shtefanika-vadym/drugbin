import { useCollectStatusQuery } from 'api/statusApi'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsPV } from 'components/ui/CustomTable/TableColumns'
import { PdfLayout } from './PdfLayout'
import { Content, ReasonContent, Span, Title } from './PdfViewer.styled'

export const PdfViewer: React.FC<{ id: number }> = ({ id }) => {
  const { data: pdfData, isLoading } = useCollectStatusQuery(id)

  return (
    <PdfLayout>
      <Title>Proces verbal de predare-primire medicamente expirate</Title>
      <Content>
        Subsemnatul(a) <Span>{pdfData?.clientName}</Span>, predau spre distrugere in farmacia{' '}
        <Span>{pdfData?.pharmaName}</Span> urmatoarele medicamente:
      </Content>
      <CustomTable
        columns={columnsPV}
        dataSource={pdfData?.drugList}
        isLoading={isLoading}
        loadingType='pdf'
      />
      <ReasonContent>Motivul predarii medicamentelor: PP-OP-05-F03, rev 06</ReasonContent>
    </PdfLayout>
  )
}
