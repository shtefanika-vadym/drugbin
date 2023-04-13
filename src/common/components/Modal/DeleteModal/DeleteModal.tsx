import type { FC } from 'react'

import deleteIcon from 'common/assets/icons/modalDelete.png'

import { Button } from 'common/components/Button/Button'
import Modal from 'common/components/Modal/Modal'

import {
  ButtonWrapper,
  ContentDelete,
  HeaderDelete,
  Icon,
  IconWrapper,
  Text,
  Title,
  WrapperText,
} from './DeleteModal.styled'

interface IDeleteModal {
  id: string
  handleCloseModal: any
}

export const DeleteModal: FC<IDeleteModal> = ({ handleCloseModal, id }) => {
  console.log('id', id)
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <ContentDelete>
        <HeaderDelete>
          <IconWrapper>
            <Icon src={deleteIcon} />
          </IconWrapper>
          <WrapperText>
            <Title>Are you sure you want to cancel this action?</Title>
            <Text>
              This will delete all the data in the form and it is a non reversible action.
            </Text>
          </WrapperText>
        </HeaderDelete>
        <ButtonWrapper>
          <Button variant='primary'>Yes, I confirm</Button>
          <Button variant='secondary'>No, close</Button>
        </ButtonWrapper>
      </ContentDelete>
    </Modal>
  )
}
