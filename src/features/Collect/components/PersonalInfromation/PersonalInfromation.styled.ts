import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_COLOR_RED } from 'common/style/colors'

export const PersonalInfromationWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const FormWrapper = styled.div`
  ${flex({ direction: 'column', gap: '16px' })};
`

export const InputWrapper = styled.div``

export const Error = styled.p`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_RED};
  float: right;
  padding-top: 4px;
`
