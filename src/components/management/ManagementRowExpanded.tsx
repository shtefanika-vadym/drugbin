import { useGetDocument } from 'common/hooks/documents'
import useDialog from 'common/hooks/useDialog'
import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/style/colors'
import { DocumentType } from 'common/types/documents.types'
import { fromDrugPack } from 'common/utils/pack'
import { Button } from 'components/ui/Button/Button'
import { DocumentViewer } from 'components/ui/DocumentViewer/DocumentViewer'
import { Attachment } from 'components/ui/Icon'
import { Loader } from 'components/ui/Loader'
import { Text } from 'components/ui/Text/Text'
import { useCallback } from 'react'
import { Container, Content, DrugContainer, WrapperBox } from './ManagementRowExpanded.styled'
import { DrugList } from 'common/types/managament.types'

interface ManagementRowExpamdedProps {
  drugList: DrugList[]
  id: string
}

export const ManagementRowExpanded: React.FC<ManagementRowExpamdedProps> = ({ drugList, id }) => {
  const {
    trigger: triggerNormal,
    isMutating: isLoadingNormal,
    data: normalPDF,
  } = useGetDocument(id, DocumentType.NORMAL)
  const {
    trigger: triggerPsycholeptic,
    isMutating: isLoadingPsycholeptic,
    data: psycholepticPDF,
  } = useGetDocument(id, DocumentType.PSYCHOLEPTIC)

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

  const handleOpenNormal = useCallback(async () => {
    await triggerNormal()
    toggleDocumentNormalViewerDialog()
  }, [triggerNormal, toggleDocumentNormalViewerDialog])

  const handleOpenPsycholeptic = useCallback(async () => {
    await triggerPsycholeptic()
    toggleDocumentPsycholepticViewerDialog()
  }, [triggerPsycholeptic, toggleDocumentPsycholepticViewerDialog])

  return (
    <Container>
      <DocumentNormalViewerDialog {...documentNormalViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={normalPDF} />
      </DocumentNormalViewerDialog>
      <DocumentPsycholepticViewerDialog {...documentPsycholepticViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={psycholepticPDF} />
      </DocumentPsycholepticViewerDialog>
      <Content>
        <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
          Documente
        </Text>
        <WrapperBox>
          <Button
            disabled={isLoadingNormal}
            variant='document'
            size='XS'
            onClick={handleOpenNormal}>
            <Loader isLoading={isLoadingNormal}>
              <Attachment />
            </Loader>
            PV Predare General
          </Button>
          <Button
            disabled={isLoadingPsycholeptic}
            variant='document'
            size='XS'
            onClick={handleOpenPsycholeptic}>
            <Loader isLoading={isLoadingPsycholeptic}>
              <Attachment />
            </Loader>
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
              <Text>{drug?.name.value}</Text>
              <Text variant='bodyXS' color={WDS_COLOR_GREY}>
                ({drug.quantity})
              </Text>
            </WrapperBox>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              {fromDrugPack(drug.pack)}
            </Text>
          </DrugContainer>
        ))}
      </Content>
    </Container>
  )
}
