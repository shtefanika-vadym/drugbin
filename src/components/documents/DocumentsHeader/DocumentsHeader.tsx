import useDialog from 'common/hooks/useDialog'
import { DocumentType } from 'common/types/documents.types'
import { Button } from 'components/ui/Button/Button'
import { DocumentCreation } from 'components/ui/DocumentCreation'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { Content, Title, TitleWrapper } from './DocumentsHeader.styled'

const DOCUMENTS_LIST_NAVIGATION = [
  { name: 'Proces Verbal', route: '/documente/proces-verbal' },
  { name: 'Psihotropice', route: '/documente/psihotropice' },
  { name: 'Trimise', route: '/documente/trimise' },
  { name: 'Șterse', route: '/documente/sterse' },
]

interface DocumentsHeaderProps {
  showButton?: boolean
  /** Which tab we can create a PV for (normal spans categories 1-6, psycholeptic = 7). */
  type?: DocumentType
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
          tab={type ?? DocumentType.NORMAL}
          close={toggleDocumentCreationDialog}
          refetchDocuments={refetchDocuments}
        />
      </DocumentCreationDialog>
      <TitleWrapper>
        <Title>Documente</Title>
        {showButton && (
          <Button onClick={() => toggleDocumentCreationDialog()}>Generare proces verbal</Button>
        )}
      </TitleWrapper>
      <NavigateList list={DOCUMENTS_LIST_NAVIGATION} />
    </Content>
  )
}
