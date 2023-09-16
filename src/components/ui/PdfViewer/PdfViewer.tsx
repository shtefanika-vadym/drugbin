import { useCollectStatusQuery } from 'api/statusApi'
import logoIcon from 'common/assets/logo.svg'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsPV } from 'components/ui/CustomTable/TableColumns'
import Modal from 'components/ui/Modal/Modal'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useRef } from 'react'
import {
  Border,
  Content,
  ContentBold,
  ControlContent,
  DataContent,
  Icon,
  Logo,
  Page,
  PdfContent,
  ReasonContent,
  SignatureContent,
  SignatureWrapper,
  Span,
  Test,
  Title,
} from './PdfViewer.styled'
import downloadCloudLine from 'common/assets/download-cloud-line.svg'
import shareLine from 'common/assets/share-line.svg'
import xIcon from 'common/assets/xIcon.svg'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { useAppDispatch } from 'store/hooks'

export const PdfViewer: React.FC<{ id: number }> = ({ id }) => {
  const dispatch = useAppDispatch()
  const printRef = useRef()

  const { data: pdfData, isLoading } = useCollectStatusQuery(id)

  const handleDownloadPdf = async () => {
    const element = printRef.current
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL('image/png')

    const pdf = new jsPDF()
    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${pdfData.clientName} - ${pdfData.generationDate}.pdf`)
  }

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  return (
    <Modal type='pdf'>
      <Test>
        <Page>
          <PdfContent ref={printRef}>
            <div>
              <Logo src={logoIcon} alt='Logo Icon' />
              <Border />
            </div>
            <DataContent>Data {pdfData?.generationDate}</DataContent>
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
            <SignatureContent>
              <SignatureWrapper>
                <Content>Am predat,</Content>
                <ContentBold>{pdfData?.clientName}</ContentBold>
              </SignatureWrapper>
              <SignatureWrapper>
                <Content>Am preluat,</Content>
                <ContentBold>{pdfData?.pharmaName}</ContentBold>
              </SignatureWrapper>
            </SignatureContent>
          </PdfContent>
        </Page>
        <ControlContent>
          <Button variant='white' size='S-square' onClick={handleCloseModal}>
            <Icon src={xIcon} />
          </Button>
          <Button variant='white' size='S-square' onClick={handleDownloadPdf}>
            <Icon src={downloadCloudLine} />
          </Button>
          <Button variant='white' size='S-square'>
            <Icon src={shareLine} />
          </Button>
        </ControlContent>
      </Test>
    </Modal>
  )
}
