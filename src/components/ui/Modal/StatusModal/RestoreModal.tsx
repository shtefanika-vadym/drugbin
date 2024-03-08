import { WDS_COLOR_BLUE_100, WDS_COLOR_BLUE_700, WDS_COLOR_GREY } from 'common/style/colors'
import { Button } from 'components/ui/Button/Button'
import { RestoreIcon } from 'components/ui/Icon'
import Modal from 'components/ui/Modal/Modal'
import { Text } from 'components/ui/Text/Text'
import { useCallback } from 'react'
import { BoxIcon, ButtonWrapper, Container, Content } from './StatusModal.styled'

interface RestoreProps {
  id: number
  handleCloseModal: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RestoreModal: React.FC<RestoreProps> = ({ handleCloseModal, id }) => {
  //   const [deleteStatus, { isLoading }] = useDeleteStatusMutation()

  //   const currentPage = useGetCurrentPage()
  //   const { refetch } = useGetEntriesQuery(currentPage)

  const handleRestore = useCallback(async () => {
    // if (id) await deleteStatus(id)
    // if (!isLoading) handleCloseModal()
    // refetch()
  }, [])

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Container>
        <BoxIcon color={WDS_COLOR_BLUE_100}>
          <RestoreIcon height={32} width={32} />
        </BoxIcon>
        <Content>
          <Text textVariant='titleH5' color={WDS_COLOR_BLUE_700}>
            Sunteți sigur că doriți să restaurați această cerere de colectare?
          </Text>
          <Text textVariant='bodyS' color={WDS_COLOR_GREY}>
            Aceasta este o acțiune ireversibilă care va duce la restaurarea datelor referitoare la
            cererea de colectare în întregul sistem DrugBin.
          </Text>
        </Content>
      </Container>
      <ButtonWrapper>
        <Button variant='secondary' onClick={handleCloseModal}>
          Anulare
        </Button>
        <Button variant='primary' onClick={handleRestore}>
          Da, confirm.
        </Button>
      </ButtonWrapper>
    </Modal>
  )
}
