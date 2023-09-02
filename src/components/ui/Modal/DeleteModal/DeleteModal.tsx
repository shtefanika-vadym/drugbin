import type { FC } from 'react'

import deleteIcon from 'common/assets/modalDelete.png'
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
import Modal from 'components/ui/Modal/Modal'
import { Button } from 'components/ui/Button/Button'

interface IDeleteModal {
  id: string
  handleCloseModal: any
}

// TODO --> REFACTORING
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
