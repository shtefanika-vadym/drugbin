import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from 'common/components/Button/Button'
import Modal from 'common/components/Modal/Modal'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { SET_OPEN_VERBAL_PROCESS } from 'features/Collect/slices/recycleSlice'

import { ButtonWrapper, Text, Title } from './FinishModal.styled'

interface IFinishModal {
  handleCloseModal: any
}

export const FinishModal: FC<IFinishModal> = ({ handleCloseModal }) => {
  const dispatch = useDispatch()
  const handleConfirm = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    dispatch(SET_OPEN_VERBAL_PROCESS(true))
  }
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Title>Finish process</Title>
      <Text>
        By agreeing to finish this action, you give us permission to use your personal data
        according to GDPR regulations and your name to sign the verbal process.
      </Text>
      <ButtonWrapper>
        <Button variant='secondary' onClick={handleCloseModal}>
          No, cancel
        </Button>
        <Button onClick={handleConfirm}>Yes, I confirm</Button>
      </ButtonWrapper>
    </Modal>
  )
}
