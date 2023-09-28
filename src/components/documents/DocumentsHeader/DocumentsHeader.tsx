import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { Button } from 'components/ui/Button/Button'
import { DocumentsGenModal } from 'components/ui/Modal/DocumentsGenModal/DocumentsGenModal'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { useAppDispatch } from 'store/hooks'
import { Content, Title, TitleWrapper } from './DocumentsHeader.styled'
import { useDocumentsLastDateQuery } from 'api/documentsApi'

const LIST = ['Proces Verbal', 'Psihotropice', 'Trimise', 'Șterse']

export const DocumentsHeader: React.FC<{ showButton?: boolean; type?: string }> = ({
  showButton = false,
  type,
}) => {
  const dispatch = useAppDispatch()
  const { data } = useDocumentsLastDateQuery(type)

  const callbackOnClickGenerate = () => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: (
          <DocumentsGenModal
            handleCloseModal={handleCloseModal}
            disabledDate={data.date}
            type={type}
          />
        ),
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
        {showButton && <Button onClick={callbackOnClickGenerate}>Generare document</Button>}
      </TitleWrapper>
      <NavigateList list={LIST} />
    </Content>
  )
}
