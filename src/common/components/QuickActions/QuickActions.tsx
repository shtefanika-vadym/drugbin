import type { FC } from 'react'

import { useAppDispatch } from 'store/hooks'

import done from 'common/assets/icons/done.svg'
import editIcon from 'common/assets/icons/edit.svg'
import eye from 'common/assets/icons/eye-table.svg'
import deleteIcon from 'common/assets/icons/trash.svg'

import { Button } from 'common/components/Button/Button'
import { DeleteModal } from 'common/components/Modal/DeleteModal/DeleteModal'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { Container, Icon } from './QuickActions.styled'

interface IQuickActionsProps {
  id: string
  variant?: string
}

export const QuickActions: FC<IQuickActionsProps> = ({ id, variant = 'pharmacy' }) => {
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
      ) : (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={eye} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={done} />
          </Button>
        </>
      )}
    </Container>
  )
}
