import { useGetMonthlyRaport } from 'common/hooks/documents'
import useDialog from 'common/hooks/useDialog'
import { useDownloadPDF } from 'common/hooks/useDownloadPDF'
import { usePrintPDF } from 'common/hooks/usePrintPDF'
import { DocumentsVerbalProcess } from 'common/interfaces/DocumentsProps'
import { DocumentType } from 'common/types/documents'
import { Button } from 'components/ui/Button/Button'
import { DocumentViewer } from 'components/ui/DocumentViewer/DocumentViewer'
import { DownloadIcon, PrintIcon, ViewIcon } from 'components/ui/Icon'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { useCallback } from 'react'
import { ActionContainer } from './DocumentsListRow.styled'

interface DocumentsListRowProps {
  item: DocumentsVerbalProcess
  documentType: DocumentType
}

interface ActionCellProps {
  id: string
  documentType: DocumentType
}

export const DocumentsListRow: React.FC<DocumentsListRowProps> = ({ item, documentType }) => {
  return (
    <div>
      <TableRow>
        <TableCell label={item.documentId}>Raport Medicamente</TableCell>
        <TableCell label={item.createAt.time}>{item.createAt.data}</TableCell>
        <TableCell>
          {item.period.startDate} - {item.period.endDate}
        </TableCell>
        <TableCell>
          <ActionCell id={item.documentId} documentType={documentType} />
        </TableCell>
      </TableRow>
    </div>
  )
}

const ActionCell: React.FC<ActionCellProps> = ({ id, documentType }) => {
  const [DocumentViewerDialog, documenViewerDialogProps, toggleTrashViewerDialog] = useDialog()

  const { data, trigger, isMutating } = useGetMonthlyRaport(id, documentType)
  const { printPDF, iframeRef } = usePrintPDF()
  const downloadPDF = useDownloadPDF()

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
    <ActionContainer>
      <DocumentViewerDialog {...documenViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={data} />
      </DocumentViewerDialog>
      <iframe ref={iframeRef} style={{ display: 'none' }} />
      <Button variant='square' size='S-square' onClick={handleViewDocument} disabled={isMutating}>
        <ViewIcon />
      </Button>
      <Button variant='square' size='S-square' onClick={handleDownloadPDF}>
        <DownloadIcon />
      </Button>
      <Button variant='square' size='S-square' onClick={handlePrint}>
        <PrintIcon />
      </Button>
    </ActionContainer>
  )
}
