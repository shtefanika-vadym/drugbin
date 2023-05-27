import type { FC } from 'react'

import Modal from 'common/components/Modal/Modal'
import { Spinner } from 'common/components/Spinner'

import { Title, Text, SpinnerWrapper } from './ProcessingModal.styled'

interface IProcessingModal {
  handleCloseModal: any
  isLoading: boolean
}

export const ProcessingModal: FC<IProcessingModal> = ({ handleCloseModal, isLoading }) => {
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Title>Processing Image...</Title>
      <Text>
        Please wait while we analyze the contents of the box. This may take a few moments as we
        identify the drugs and retrieve their names for you.
      </Text>
      <SpinnerWrapper>
        <Spinner isLoading={isLoading} />
      </SpinnerWrapper>
    </Modal>
  )
}
