import { useCallback, type FC } from 'react'

import { useAppDispatch } from 'store/hooks'

import done from 'common/assets/done.svg'
import downloadCloudLine from 'common/assets/download-cloud-line.svg'
import editIcon from 'common/assets/edit.svg'
import eye from 'common/assets/eye-table.svg'
import reverse from 'common/assets/reverse.svg'
import shareLine from 'common/assets/share-line.svg'
import deleteIcon from 'common/assets/trash.svg'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { Button } from 'components/ui/Button/Button'
import { ApproveModal } from 'components/ui/Modal/ApproveModal/ApproveModal'
import { DeleteModal } from 'components/ui/Modal/DeleteModal/DeleteModal'
import { DocumentsPdf } from 'components/ui/PdfViewer/DocumentsPdf'
import { PdfViewer } from 'components/ui/PdfViewer/PdfViewer'
import { Container, Icon } from './QuickActions.styled'

interface IQuickActionsProps {
  id: number | any
  variant?: string
  refetch?: any
}

// TODO --> REFACTORING
export const QuickActions: FC<IQuickActionsProps> = ({ id, variant = 'pharmacy', refetch }) => {
  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  const callbackOnClickDelete = (taskId: number) => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <DeleteModal handleCloseModal={handleCloseModal} id={taskId} />,
      }),
    )
  }

  const callbackOnClickApprove = (taskId: number) => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: (
          <ApproveModal handleCloseModal={handleCloseModal} id={taskId} refetch={refetch} />
        ),
      }),
    )
  }

  const opneConfirm = (e: any) => {
    e.stopPropagation()
    callbackOnClickApprove(id)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openPDF = (e: any) => {
    e.stopPropagation()
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <PdfViewer id={id} />,
      }),
    )
  }

  const handleOpneDocuments = useCallback((e: any) => {
    e.stopPropagation()
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <DocumentsPdf id={id} />,
      }),
    )
  }, [])

  return (
    <Container>
      {variant === 'pharmacy' ? (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={editIcon} />
          </Button>
          <Button variant='square' size='S-square' onClick={() => callbackOnClickDelete(id)}>
            <Icon src={deleteIcon} />
          </Button>
        </>
      ) : variant === 'documents' ? (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={eye} onClick={handleOpneDocuments} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={shareLine} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={downloadCloudLine} />
          </Button>
        </>
      ) : variant === 'shared' ? (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={eye} onClick={handleOpneDocuments} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={downloadCloudLine} />
          </Button>
        </>
      ) : variant === 'trash' ? (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={eye} onClick={handleOpneDocuments} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={reverse} />
          </Button>
        </>
      ) : (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={eye} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={done} onClick={opneConfirm} />
          </Button>
        </>
      )}
    </Container>
  )
}
