import styled from 'styled-components'

import { WDS_COLOR_RED } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_012_PX, WDS_SIZE_016_PX, WDS_SIZE_024_PX } from 'common/style/size'

export const ContentAddNew = styled.form`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
  width: 100rem;
  max-width: 100rem;
  padding: ${WDS_SIZE_024_PX};
  border-radius: ${WDS_SIZE_016_PX};
  background: white;
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
