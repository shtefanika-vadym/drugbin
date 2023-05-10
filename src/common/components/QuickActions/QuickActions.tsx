import type { FC } from 'react'

import { useAppDispatch } from 'store/hooks'

import done from 'common/assets/icons/done.svg'
import downloadCloudLine from 'common/assets/icons/download-cloud-line.svg'
import editIcon from 'common/assets/icons/edit.svg'
import eye from 'common/assets/icons/eye-table.svg'
import shareLine from 'common/assets/icons/share-line.svg'
import deleteIcon from 'common/assets/icons/trash.svg'

import { Button } from 'common/components/Button/Button'
import { ApproveModal } from 'common/components/Modal/ApproveModal/ApproveModal'
import { DeleteModal } from 'common/components/Modal/DeleteModal/DeleteModal'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { DocumentsModal } from '../Modal/DocumentsModal/DocumentsModal'
import { Container, Icon } from './QuickActions.styled'

interface IQuickActionsProps {
  id: string
  variant?: string
  refetch?: any
}

export const QuickActions: FC<IQuickActionsProps> = ({ id, variant = 'pharmacy', refetch }) => {
  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  const callbackOnClickDelete = (taskId: string) => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <DeleteModal handleCloseModal={handleCloseModal} id={taskId} />,
      }),
    )
  }

  const callbackOnClickApprove = (taskId: string) => {
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

  const openPDF = (e: any) => {
    e.stopPropagation()
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <DocumentsModal />,
      }),
    )
  }

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
            <Icon src={eye} onClick={openPDF} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={shareLine} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={downloadCloudLine} />
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
