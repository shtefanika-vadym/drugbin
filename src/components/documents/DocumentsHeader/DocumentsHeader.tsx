import useDialog from 'common/hooks/useDialog'
import { Button } from 'components/ui/Button/Button'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { Content, Title, TitleWrapper } from './DocumentsHeader.styled'
import { DocumentCreation } from 'components/ui/DocumentCreation'
import { DocumentType } from 'common/types/documents.types'

// 'Trimise', 'Șterse'
const LIST = ['Proces Verbal', 'Psihotropice']

export const DocumentsHeader: React.FC<{ showButton?: boolean; type?: DocumentType }> = ({
  showButton = false,
  type,
}) => {
  const [DocumentCreationDialog, documentCreationDialogProps, toggleDocumentCreationDialog] =
    useDialog()

  return (
    <Content>
      <DocumentCreationDialog {...documentCreationDialogProps}>
        <DocumentCreation type={type} close={toggleDocumentCreationDialog} />
      </DocumentCreationDialog>
      <TitleWrapper>
        <Title>Documente</Title>
        {showButton && (
          <Button onClick={() => toggleDocumentCreationDialog()}>Generarea Raport</Button>
        )}
      </TitleWrapper>
      <NavigateList list={LIST} />
    </Content>
  )
}
