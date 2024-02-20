import { useDownloadPDF } from 'common/hooks/useDownloadPDF'
import { usePrintPDF } from 'common/hooks/usePrintPDF'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import {
  ApproveIcon,
  DownloadIcon,
  PrintIcon,
  ShareIcon,
  TrashIcon,
  ViewIcon,
} from 'components/ui/Icon'
import { ApproveModal } from 'components/ui/Modal/ApproveModal/ApproveModal'
import { DeleteModal } from 'components/ui/Modal/DeleteModal/DeleteModal'
import { pick } from 'lodash-es'
import React, { useCallback, useMemo } from 'react'
import { useAppDispatch } from 'store/hooks'
import { Button } from '../Button/Button'
import ModalPreviewFile, { DocumentType } from '../Modal/ModalPreviewFile/ModalPreviewFile'
import { AvailableQuickAction, QUICK_ACTION_OPTIONS, QuickActionEntry } from './QuickActions.config'
import { ButtonWrapper, Container } from './QuickActions.styled'

interface QuickActionsProps {
  id: number
  status?: string
  refetch?: () => void
  type: QuickActionEntry
  documentId?: string
  documentType?: DocumentType
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  id,
  refetch,
  status,
  type,
  documentType,
}) => {
  const isApproved = useMemo(() => status !== 'pending', [status])
  const quickActionsOptions = QUICK_ACTION_OPTIONS[type]

  const dispatch = useAppDispatch()
  const downloadPDF = useDownloadPDF()
  const { printPDF, iframeRef } = usePrintPDF()

  const handleCloseModal = useCallback(() => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }, [dispatch])

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      dispatch(
        SET_SHOW_MODAL({
          isOpenModal: true,
          childModal: <DeleteModal handleCloseModal={handleCloseModal} id={id} />,
        }),
      )
    },
    [dispatch, handleCloseModal, id],
  )

  const handleApprove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      dispatch(
        SET_SHOW_MODAL({
          isOpenModal: true,
          childModal: (
            <ApproveModal handleCloseModal={handleCloseModal} id={id} refetch={refetch} />
          ),
        }),
      )
    },
    [dispatch, handleCloseModal, id, refetch],
  )

  const handleView = useCallback(() => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <ModalPreviewFile id={id} type={documentType} isRaport={true} />,
      }),
    )
  }, [dispatch, documentType, id])

  const handleDownloadPDF = useCallback(() => {
    downloadPDF(id, documentType)
  }, [documentType, downloadPDF, id])

  const handlePrint = useCallback(() => {
    printPDF(id, documentType)
  }, [documentType, id, printPDF])

  const AVAILABLE_QUICK_ACTION: AvailableQuickAction = useMemo(() => {
    return {
      delete: {
        icon: <TrashIcon />,
        action: handleDelete,
      },
      approve: {
        icon: <ApproveIcon />,
        action: handleApprove,
      },
      view: {
        icon: <ViewIcon />,
        action: handleView,
      },
      share: {
        icon: <ShareIcon />,
        action: () => {
          return
        },
      },
      download: {
        icon: <DownloadIcon />,
        action: handleDownloadPDF,
      },
      print: {
        icon: <PrintIcon />,
        action: handlePrint,
      },
    }
  }, [handleDelete, handleApprove, handleView, handleDownloadPDF, handlePrint])

  const filteredQuickActions = useMemo(() => {
    const filteredActions = pick(AVAILABLE_QUICK_ACTION, quickActionsOptions)

    if (filteredActions.approve && isApproved) {
      delete filteredActions.approve
    }

    return filteredActions
  }, [AVAILABLE_QUICK_ACTION, quickActionsOptions, isApproved])

  return (
    <Container>
      <iframe ref={iframeRef} style={{ display: 'none' }} />
      <ButtonWrapper>
        {Object.entries(filteredQuickActions).map(([key, selectedQuickAction]) => (
          <React.Fragment key={key}>
            <Button variant='square' size='S-square' onClick={selectedQuickAction.action}>
              {selectedQuickAction.icon}
            </Button>
          </React.Fragment>
        ))}
      </ButtonWrapper>
    </Container>
  )
}
