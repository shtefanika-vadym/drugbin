import useDialog from 'common/hooks/useDialog'
import { DocumentCategory } from 'common/types/documents.types'
import { Button } from 'components/ui/Button/Button'
import { DocumentCreation } from 'components/ui/DocumentCreation'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { Content, Title, TitleWrapper } from './DocumentsHeader.styled'

// 'Trimise', 'Șterse'
// const LIST = ['Proces Verbal', 'Psihotropice']

const DOCUMENTS_LIST_NAVIGATION = [
  {
    name: 'Proces Verbal',
    route: '/documents/verbal-process',
  },
  {
    name: 'Psihotropice',
    route: '/documents/psychotropic',
  },
]

interface DocumentsHeaderProps {
  showButton?: boolean
  type?: DocumentCategory
  refetchDocuments: () => void
}

export const DocumentsHeader: React.FC<DocumentsHeaderProps> = ({
  showButton = false,
  type,
  refetchDocuments,
}) => {
  const [DocumentCreationDialog, documentCreationDialogProps, toggleDocumentCreationDialog] =
    useDialog()

  return (
    <Content>
      <DocumentCreationDialog {...documentCreationDialogProps}>
        <DocumentCreation
          type={type}
          close={toggleDocumentCreationDialog}
          refetchDocuments={refetchDocuments}
        />
      </DocumentCreationDialog>
      <TitleWrapper>
        <Title>Documente</Title>
        {showButton && (
          <Button onClick={() => toggleDocumentCreationDialog()}>Generarea Raport</Button>
        )}
      </TitleWrapper>
      <NavigateList list={DOCUMENTS_LIST_NAVIGATION} />
    </Content>
  )
}
