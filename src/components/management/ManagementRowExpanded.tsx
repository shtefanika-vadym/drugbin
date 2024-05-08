import { useGetDocumnetQuery } from 'api/documentsApi'
import useDialog from 'common/hooks/useDialog'
import { DrugListProps } from 'common/interfaces/HistoryTypes'
import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/style/colors'
import { DocumentType } from 'common/types/documents'
import { Button } from 'components/ui/Button/Button'
import { DocumentViewer } from 'components/ui/DocumentViewer/DocumentViewer'
import { Attachment } from 'components/ui/Icon'
import { Text } from 'components/ui/Text/Text'
import { capitalize } from 'lodash-es'
import { Container, Content, DrugContainer, WrapperBox } from './ManagementRowExpanded.styled'
import { Spinner } from 'components/ui/Spinner/Spinner'

interface ManagementRowExpamdedProps {
  drugList: DrugListProps[]
  id: string
}

export const ManagementRowExpanded: React.FC<ManagementRowExpamdedProps> = ({ drugList, id }) => {
  const { data: documentNormal, isLoading: isDocumentNormalLoading } = useGetDocumnetQuery({
    id,
    type: DocumentType.NORMAL,
  })
  const { data: documentPsycholeptic, isLoading: isDocumentPsycholepticLoading } =
    useGetDocumnetQuery({
      id,
      type: DocumentType.PSYCHOLEPTIC,
    })

  const [
    DocumentNormalViewerDialog,
    documentNormalViewerDialogProps,
    toggleDocumentNormalViewerDialog,
  ] = useDialog()

  const [
    DocumentPsycholepticViewerDialog,
    documentPsycholepticViewerDialogProps,
    toggleDocumentPsycholepticViewerDialog,
  ] = useDialog()

  return (
    <Container>
      <DocumentNormalViewerDialog {...documentNormalViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={documentNormal} />
      </DocumentNormalViewerDialog>
      <DocumentPsycholepticViewerDialog {...documentPsycholepticViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={documentPsycholeptic} />
      </DocumentPsycholepticViewerDialog>
      <Content>
        <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
          Documente
        </Text>
        <WrapperBox>
          <Button
            disabled={isDocumentNormalLoading}
            variant='document'
            size='XS'
            onClick={() => toggleDocumentNormalViewerDialog(true)}>
            {!isDocumentNormalLoading ? <Attachment /> : <Spinner />}
            PV Predare General
          </Button>
          <Button
            disabled={isDocumentPsycholepticLoading}
            variant='document'
            size='XS'
            onClick={() => toggleDocumentPsycholepticViewerDialog(true)}>
            {!isDocumentPsycholepticLoading ? <Attachment /> : <Spinner />}
            Declaratie PR Stupefiante
          </Button>
        </WrapperBox>
      </Content>
      <Content>
        <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
          Medicamente
        </Text>
        {drugList.map((drug) => (
          <DrugContainer>
            <WrapperBox>
              <Text>{drug.drugDetails.name}</Text>
              <Text variant='bodyXS' color={WDS_COLOR_GREY}>
                ({drug.quantity})
              </Text>
            </WrapperBox>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              {capitalize(drug.pack)}
            </Text>
          </DrugContainer>
        ))}
      </Content>
    </Container>
  )
}
