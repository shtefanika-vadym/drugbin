import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from 'common/components/Button/Button'
import Modal from 'common/components/Modal/Modal'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { ButtonWrapper, Text, Title } from './FinishModal.styled'

interface IFinishModal {
  handleCloseModal: any
  setActiveStep: (step: any) => void
}

export const FinishModal: FC<IFinishModal> = ({ handleCloseModal, setActiveStep }) => {
  const dispatch = useDispatch()
  const handleConfirm = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    setActiveStep((prevActiveStep: number) => prevActiveStep + 2)
  }

  const handleReadMore = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
  }

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Title>Finish process</Title>
      <Text>
        By agreeing to finish this action, you give us permission to use your personal data
        according to GDPR regulations and your name to sign the verbal process.
        <span onClick={handleReadMore}> Read more</span>
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
