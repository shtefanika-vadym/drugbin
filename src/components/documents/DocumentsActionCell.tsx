import { deletePv, restorePv, sharePv, useGetMonthlyRaport } from 'common/hooks/documents'
import useDialog from 'common/hooks/useDialog'
import { useDownloadPDF } from 'common/hooks/useDownloadPDF'
import { usePrintPDF } from 'common/hooks/usePrintPDF'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { DocumentViewer } from 'components/ui/DocumentViewer/DocumentViewer'
import {
  DownloadIcon,
  PrintIcon,
  RestoreIcon,
  ShareIcon,
  TrashIcon,
  ViewIcon,
} from 'components/ui/Icon'
import { Loader } from 'components/ui/Loader'
import { useCallback } from 'react'
import { Container } from './DocumentsActionCell.styled'
import type { DocumentsMode } from './Documents'

interface DocumentsActionCellProps {
  id: string
  shared: boolean
  mode: DocumentsMode
  mutate: () => void
}

export const DocumentsActionCell: React.FC<DocumentsActionCellProps> = ({
  id,
  shared,
  mode,
  mutate,
}) => {
  const confirm = useConfirm()
  const [DocumentViewerDialog, dialogProps, toggleViewer] = useDialog()
  const { data, trigger, isMutating } = useGetMonthlyRaport(id)
  const { printPDF, iframeRef } = usePrintPDF()
  const { downloadPDF, isLoading: isDownloading } = useDownloadPDF()

  const handleView = useCallback(async () => {
    await trigger()
    toggleViewer()
  }, [trigger, toggleViewer])

  const handleShare = useCallback(async () => {
    const ok = await confirm({
      title: 'Trimiți procesul verbal?',
      description:
        'După trimitere, conținutul este înghețat și PDF-ul devine documentul oficial de predare. ' +
        'Acțiunea nu poate fi anulată.',
      confirmLabel: 'Trimite',
      action: () => sharePv(id),
    })
    if (ok) mutate()
  }, [confirm, id, mutate])

  const handleDelete = useCallback(async () => {
    const ok = await confirm({
      title: 'Ștergi acest document?',
      description: 'Documentul va fi mutat în „Șterse” și poate fi restaurat.',
      confirmLabel: 'Șterge',
      danger: true,
      action: () => deletePv(id),
    })
    if (ok) mutate()
  }, [confirm, id, mutate])

  const handleRestore = useCallback(async () => {
    await restorePv(id)
    mutate()
  }, [id, mutate])

  const showShare = (mode === 'normal' || mode === 'psycholeptic') && !shared
  const showDelete = mode === 'normal' || mode === 'psycholeptic'
  const showRestore = mode === 'trash'

  return (
    <Container>
      <DocumentViewerDialog {...dialogProps} isDocumentLayout>
        <DocumentViewer documentURL={data} />
      </DocumentViewerDialog>
      <iframe ref={iframeRef} title='print' style={{ display: 'none' }} />

      <Button variant='square' size='S-square' onClick={handleView} disabled={isMutating}>
        <Loader isLoading={isMutating} justify='center'>
          <ViewIcon />
        </Loader>
      </Button>
      <Button
        variant='square'
        size='S-square'
        onClick={() => downloadPDF(id)}
        disabled={isDownloading}>
        <Loader isLoading={isDownloading} justify='center'>
          <DownloadIcon />
        </Loader>
      </Button>
      <Button variant='square' size='S-square' onClick={() => printPDF(id)}>
        <PrintIcon />
      </Button>
      {showShare && (
        <Button variant='square' size='S-square' onClick={handleShare}>
          <ShareIcon />
        </Button>
      )}
      {showRestore && (
        <Button variant='square' size='S-square' onClick={handleRestore}>
          <RestoreIcon />
        </Button>
      )}
      {showDelete && (
        <Button variant='square' size='S-square' onClick={handleDelete}>
          <TrashIcon />
        </Button>
      )}
    </Container>
  )
}
