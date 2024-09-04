import { useGetMonthlyRaport } from 'common/hooks/documents'
import useDialog from 'common/hooks/useDialog'
import { useDownloadPDF } from 'common/hooks/useDownloadPDF'
import { usePrintPDF } from 'common/hooks/usePrintPDF'
import { DocumentType } from 'common/types/documents.types'
import { Button } from 'components/ui/Button/Button'
import { DocumentViewer } from 'components/ui/DocumentViewer/DocumentViewer'
import { DownloadIcon, PrintIcon, ViewIcon } from 'components/ui/Icon'
import { useCallback } from 'react'
import { Container } from './DocumentsActionCell.styled'
import { Loader } from 'components/ui/Loader'

interface DocumentsActionCellProps {
  id: string
  documentType: DocumentType
}

export const DocumentsActionCell: React.FC<DocumentsActionCellProps> = ({ id, documentType }) => {
  const [DocumentViewerDialog, documenViewerDialogProps, toggleTrashViewerDialog] = useDialog()

  const { data, trigger, isMutating } = useGetMonthlyRaport(id, documentType)
  const { printPDF, iframeRef } = usePrintPDF()
  const { downloadPDF, isLoading: isDownloadLoading } = useDownloadPDF()

  const handleDownloadPDF = useCallback(() => {
    downloadPDF(id, documentType)
  }, [documentType, downloadPDF, id])

  const handlePrint = useCallback(() => {
    printPDF(id, documentType)
  }, [documentType, id, printPDF])

  const handleViewDocument = useCallback(async () => {
    await trigger()
    toggleTrashViewerDialog()
  }, [trigger, toggleTrashViewerDialog])

  return (
    <Container>
      <DocumentViewerDialog {...documenViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={data} />
      </DocumentViewerDialog>
      <iframe ref={iframeRef} style={{ display: 'none' }} />
      <Button variant='square' size='S-square' onClick={handleViewDocument} disabled={isMutating}>
        <Loader isLoading={isMutating} justify='center'>
          <ViewIcon />
        </Loader>
      </Button>
      <Button
        variant='square'
        size='S-square'
        onClick={handleDownloadPDF}
        disabled={isDownloadLoading}>
        <Loader isLoading={isDownloadLoading} justify='center'>
          <DownloadIcon />
        </Loader>
      </Button>
      <Button variant='square' size='S-square' onClick={handlePrint}>
        <PrintIcon />
      </Button>
    </Container>
  )
}
