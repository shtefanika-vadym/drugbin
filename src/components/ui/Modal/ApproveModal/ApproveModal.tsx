import { useGetEntriesQuery } from 'api/management'
import { useUpdateStatusMutation } from 'api/statusApi'
import approveIcon from 'common/assets/approve.png'
import { Button } from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal/Modal'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  BoxIcon,
  ButtonWrapper,
  Container,
  Description,
  Text,
  Title,
  TitleBox,
} from './ApproveModal.styled'

export const ApproveModal = ({ handleCloseModal, id }: any) => {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation()

  const [searchParams] = useSearchParams()
  const currentPage = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams])
  const { refetch } = useGetEntriesQuery(currentPage)

  const handleUpdateStatus = async () => {
    if (id) await updateStatus(id)
    if (!isLoading) handleCloseModal()
    refetch()
  }

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Container>
        <TitleBox>
          <BoxIcon>
            <img src={approveIcon} alt='Approve' />
          </BoxIcon>
          <Title>Sunteți sigur că doriți să aprobați această cerere de colectare?</Title>
        </TitleBox>
        <Description>
          <Text>
            Aceasta este o acțiune ireversibilă care va duce la aprobarea cererii de colectare în
            sistemul DrugBin.
          </Text>
        </Description>
        <ButtonWrapper>
          <Button variant='secondary' onClick={handleCloseModal}>
            Anulare
          </Button>
          <Button variant='primary' onClick={handleUpdateStatus}>
            {isLoading ? 'Încărcare...' : 'Aprobare'}
          </Button>
        </ButtonWrapper>
      </Container>
    </Modal>
  )
}
