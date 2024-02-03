import type { FC } from 'react'

import deleteIcon from 'common/assets/modalDelete.png'
import { Button } from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal/Modal'
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
  id: number
  handleCloseModal: any
}

// TODO --> REFACTORING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DeleteModal: FC<IDeleteModal> = ({ handleCloseModal, id }) => {
  return (
    <Modal callbackOnClose={handleCloseModal}>
      <ContentDelete>
        <HeaderDelete>
          <IconWrapper>
            <Icon src={deleteIcon} />
          </IconWrapper>
          <WrapperText>
            <Title>Sunteți sigur că doriți să ștergeți această cerere de colectare?</Title>
            <Text>
              Aceasta este o acțiune ireversibilă care va duce la ștergerea datelor referitoare la
              cererea de colectare din întregul sistem DrugBin.
            </Text>
          </WrapperText>
        </HeaderDelete>
        <ButtonWrapper>
          <Button variant='primary'>Da, confirm.</Button>
          <Button variant='secondary' onClick={handleCloseModal}>
            Anulare
          </Button>
        </ButtonWrapper>
      </ContentDelete>
    </Modal>
  )
}
