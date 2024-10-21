import { useGetDocument } from 'common/hooks/documents'
import useDialog from 'common/hooks/useDialog'
import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/styles/colors'
import { DrugList } from 'common/types/managament.types'
import { fromDrugPack } from 'common/utils/pack'
import { categoryLabels } from 'common/utils/utils'
import { Button } from 'components/ui/Button/Button'
import { DocumentViewer } from 'components/ui/DocumentViewer/DocumentViewer'
import { Attachment } from 'components/ui/Icon'
import { Loader } from 'components/ui/Loader'
import { Text } from 'components/ui/Text/Text'
import { uniq } from 'lodash-es'
import { useCallback, useMemo, useState } from 'react'
import { Container, Content, DrugContainer, WrapperBox } from './ManagementRowExpanded.styled'

interface ManagementRowExpamdedProps {
  drugList: DrugList[]
  id: string
}

export const ManagementRowExpanded: React.FC<ManagementRowExpamdedProps> = ({ drugList, id }) => {
  const categories = useMemo(() => uniq(drugList.map((drug) => drug.category)), [drugList])

  const [currentCategory, setCurrentCategory] = useState<number>(categories[0])

  const {
    trigger,
    isMutating,
    data: normalPDF,
  } = useGetDocument(id, currentCategory)

  const [
    DocumentNormalViewerDialog,
    documentNormalViewerDialogProps,
    toggleDocumentNormalViewerDialog,
  ] = useDialog()

  const handleOpenNormal = useCallback(async (category: number) => {
    await setCurrentCategory(category)
    await trigger()
    toggleDocumentNormalViewerDialog()
  }, [trigger, toggleDocumentNormalViewerDialog])

  return (
    <Container>
      <DocumentNormalViewerDialog {...documentNormalViewerDialogProps} isDocumentLayout>
        <DocumentViewer documentURL={normalPDF} />
      </DocumentNormalViewerDialog>
      <Content>
        <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
          Documente
        </Text>
        <WrapperBox>
          {categories.map((category) => (
            <Button
              key={category}
              disabled={isMutating}
              variant='document'
              size='XS'
              onClick={() => handleOpenNormal(category)}>
              <Loader isLoading={isMutating}>
                <Attachment />
              </Loader>
              PV {categoryLabels[category]}
            </Button>
          ))}
        </WrapperBox>
      </Content>
      <Content>
        <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
          Medicamente
        </Text>
        {drugList.map((drug) => (
          <DrugContainer>
            <WrapperBox>
              <Text>{drug?.name}</Text>
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
