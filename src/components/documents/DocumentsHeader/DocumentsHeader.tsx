import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { Button } from 'components/ui/Button/Button'
import { DocumentsGenModal } from 'components/ui/Modal/DocumentsGenModal/DocumentsGenModal'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { useAppDispatch } from 'store/hooks'
import { Content, Title, TitleWrapper } from './DocumentsHeader.styled'

// 'Trimise', 'Șterse'
const LIST = ['Proces Verbal', 'Psihotropice']

export const DocumentsHeader: React.FC<{ showButton?: boolean }> = ({ showButton = false }) => {
  const dispatch = useAppDispatch()

  const callbackOnClickGenerate = () => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <DocumentsGenModal handleCloseModal={handleCloseModal} />,
      }),
    )
  }
  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  return (
    <Content>
      <TitleWrapper>
        <Title>Documente</Title>
        {showButton && <Button onClick={callbackOnClickGenerate}>Generarea Rapoart</Button>}
      </TitleWrapper>
      <NavigateList list={LIST} />
    </Content>
  )
}
