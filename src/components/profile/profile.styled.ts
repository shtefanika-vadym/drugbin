import {
  WDS_COLOR_BLUE_100,
  WDS_COLOR_GREY,
  WDS_COLOR_GREY_100,
  WDS_COLOR_WHITE_100,
} from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_032_PX,
  WDS_SIZE_416_PX,
} from 'common/styles/size'
import { Text } from 'components/ui/Text/Text'
import styled from 'styled-components'

export const Sections = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_032_PX })};
`

export const Cards = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`

export const DefinitionList = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: ${WDS_SIZE_012_PX} ${WDS_SIZE_024_PX};
  margin: 0;

  dt {
    ${textVariant('bodyS')};
    color: ${WDS_COLOR_GREY};
  }
  dd {
    margin: 0;
    ${textVariant('bodyM')};
    word-break: break-word;
  }
`

export const Hint = styled(Text).attrs({ variant: 'bodyXS', color: WDS_COLOR_GREY })``

export const FormColumn = styled.form`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  max-width: ${WDS_SIZE_416_PX};
`

export const Column = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  max-width: ${WDS_SIZE_416_PX};
`

export const InlineActions = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
`

export const SignaturePreview = styled.img`
  max-width: 320px;
  max-height: 140px;
  object-fit: contain;
  padding: ${WDS_SIZE_012_PX};
  border: 1px solid ${WDS_COLOR_GREY_100};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_WHITE_100};
  display: block;
`

export const SignatureEmpty = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: 320px;
  max-width: 100%;
  height: 120px;
  border: 1px dashed ${WDS_COLOR_GREY_100};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_BLUE_100};
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_GREY};
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const DisclaimerBox = styled.div`
  padding: ${WDS_SIZE_012_PX} ${WDS_SIZE_016_PX};
  background: ${WDS_COLOR_BLUE_100};
  border-radius: ${WDS_SIZE_008_PX};
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
`
