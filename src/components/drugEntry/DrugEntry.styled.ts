import styled from 'styled-components'

import { WDS_COLOR_GREY, WDS_COLOR_RED, WDS_COLOR_WHITE } from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_040_PX,
  WDS_SIZE_074_PX,
} from 'common/style/size'

export const ContentAddNew = styled.form`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
  padding: ${WDS_SIZE_024_PX};
  border-radius: ${WDS_SIZE_016_PX};
  background: ${WDS_COLOR_WHITE};
`

export const Title = styled.p`
  ${textVariant('titleH4')};
`

export const RadioButtonWrapper = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_012_PX })};
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })}
  padding-top: ${WDS_SIZE_016_PX};
`

export const RadioLabel = styled.p`
  ${textVariant('bodyS')};
  padding-top: ${WDS_SIZE_016_PX};
`

export const Error = styled.p`
  ${textVariant('bodyXS')};
`

export const InputWrapper = styled.div`
  ${flex({ direction: 'column' })};
  color: ${WDS_COLOR_RED};
`

export const CustomButton = styled.div`
  ${flex};
  ${border({ type: 'solid', color: WDS_COLOR_GREY })};
  border-radius: ${WDS_SIZE_008_PX};
  width: ${WDS_SIZE_074_PX};
  height: ${WDS_SIZE_040_PX};
`

export const Icon = styled.img``
