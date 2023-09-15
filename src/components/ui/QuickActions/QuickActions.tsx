import type { FC } from 'react'

import { useAppDispatch } from 'store/hooks'

import done from 'common/assets/done.svg'
import downloadCloudLine from 'common/assets/download-cloud-line.svg'
import editIcon from 'common/assets/edit.svg'
import eye from 'common/assets/eye-table.svg'
import shareLine from 'common/assets/share-line.svg'
import deleteIcon from 'common/assets/trash.svg'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { Container, Icon } from './QuickActions.styled'
import { Button } from 'components/ui/Button/Button'
import { DeleteModal } from 'components/ui/Modal/DeleteModal/DeleteModal'
import { ApproveModal } from 'components/ui/Modal/ApproveModal/ApproveModal'
import { DocumentsModal } from 'components/ui/Modal/DocumentsModal/DocumentsModal'

interface IQuickActionsProps {
  id: number
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
