import { WDS_COLOR_BLUE_50, WDS_COLOR_BLUE_100, WDS_COLOR_BLUE_300, WDS_COLOR_GREY } from 'common/styles/colors'
import { border } from 'common/styles/mixins/border.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_012_PX, WDS_SIZE_016_PX, WDS_SIZE_024_PX, WDS_SIZE_040_PX } from 'common/styles/size'
import styled from 'styled-components'
import { Text } from 'components/ui/Text/Text'

export const Form = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
`

export const Description = styled(Text).attrs({ variant: 'bodyXS', color: WDS_COLOR_GREY })`
  margin-top: -${WDS_SIZE_008_PX};
`

export const Actions = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })};
  margin-top: ${WDS_SIZE_016_PX};
`

export const SecretBox = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })};
  padding: ${WDS_SIZE_016_PX};
  background: ${WDS_COLOR_BLUE_100};
  border-radius: ${WDS_SIZE_008_PX};

  code {
    font-family: 'SFMono-Regular', Consolas, monospace;
    word-break: break-all;
    ${textVariant('bodyM')};
  }
`

export const TabPanel = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  padding-top: ${WDS_SIZE_016_PX};
`

/** One setting on the "Acces" tab: a title + explanation, then its action button. */
export const AccessRow = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })};
  padding: ${WDS_SIZE_016_PX};
  background: ${WDS_COLOR_BLUE_100};
  border-radius: ${WDS_SIZE_008_PX};
`

export const AccessRowHead = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX, flexWrap: 'wrap' })};
`

/** Click-to-pick image drop zone for the simulate dialog. */
export const UploadZone = styled.button`
  all: unset;
  ${flex({ direction: 'column', alignItems: 'center', justifyContent: 'center', gap: WDS_SIZE_008_PX })};
  box-sizing: border-box;
  width: 100%;
  padding: ${WDS_SIZE_040_PX} ${WDS_SIZE_016_PX};
  cursor: pointer;
  text-align: center;
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_BLUE_50};
  ${border({ type: 'dashed', color: WDS_COLOR_BLUE_300 })};

  &:focus-visible {
    outline: solid 1px ${WDS_COLOR_BLUE_300};
  }
`

export const UploadPreview = styled.img`
  max-height: 180px;
  border-radius: ${WDS_SIZE_008_PX};
  object-fit: contain;
`

export const HiddenFileInput = styled.input`
  display: none;
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
