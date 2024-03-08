import { useGetEntriesQuery } from 'api/management'
import { useDeleteStatusMutation } from 'api/statusApi'
import { useGetCurrentPage } from 'common/hooks/useGetCurrentPage'
import { WDS_COLOR_BLUE_100, WDS_COLOR_BLUE_700, WDS_COLOR_GREY } from 'common/style/colors'
import { Button } from 'components/ui/Button/Button'
import { TrashIcon2 } from 'components/ui/Icon'
import Modal from 'components/ui/Modal/Modal'
import { Text } from 'components/ui/Text/Text'
import { useCallback } from 'react'
import { BoxIcon, ButtonWrapper, Container, Content } from './StatusModal.styled'

interface DeleteModalProps {
  id: number
  handleCloseModal: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ handleCloseModal, id }) => {
  const [deleteStatus, { isLoading }] = useDeleteStatusMutation()

  const currentPage = useGetCurrentPage()
  const { refetch } = useGetEntriesQuery(currentPage)

  const handleDeleteStatus = useCallback(async () => {
    if (id) await deleteStatus(id)
    if (!isLoading) handleCloseModal()
    refetch()
  }, [deleteStatus, handleCloseModal, id, isLoading, refetch])

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Container>
        <BoxIcon color={WDS_COLOR_BLUE_100}>
          <TrashIcon2 />
        </BoxIcon>
        <Content>
          <Text textVariant='titleH5' color={WDS_COLOR_BLUE_700}>
            Sunteți sigur că doriți să ștergeți această cerere de colectare?
          </Text>
          <Text textVariant='bodyS' color={WDS_COLOR_GREY}>
            Aceasta este o acțiune ireversibilă care va duce la ștergerea datelor referitoare la
            cererea de colectare din întregul sistem DrugBin.
          </Text>
        </Content>
      </Container>
      <ButtonWrapper>
        <Button variant='primary' onClick={handleDeleteStatus}>
          Da, confirm.
        </Button>
        <Button variant='secondary' onClick={handleCloseModal}>
          Anulare
        </Button>
      </ButtonWrapper>
    </Modal>
  )
}
