import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { ApproveIcon, DownloadIcon, PrintIcon, ShareIcon, TrashIcon, ViewIcon } from 'components/ui/Icon'
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
  const dispatch = useAppDispatch()
  const quickActionsOptions = QUICK_ACTION_OPTIONS[type]

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

  const isApproved = useMemo(() => status !== 'pending', [status])

  const pdfUrl = 'https://www.africau.edu/images/default/sample.pdf'

  const handlePrint = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = objectUrl;

      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
        URL.revokeObjectURL(objectUrl);
      };
    } catch (error) {
      console.error('Error fetching or printing the PDF:', error);
    }
  };

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
        action: () => {
          return
        },
      },
      print: {
        icon: <PrintIcon />,
        action: handlePrint
      },
    }
  }, [handleDelete, handleApprove, handleView])

  const filteredQuickActions = useMemo(() => {
    const filteredActions = pick(AVAILABLE_QUICK_ACTION, quickActionsOptions)

    if (filteredActions.approve && isApproved) {
      delete filteredActions.approve
    }

    return filteredActions
  }, [AVAILABLE_QUICK_ACTION, quickActionsOptions, isApproved])

  return (
    <Container>
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
