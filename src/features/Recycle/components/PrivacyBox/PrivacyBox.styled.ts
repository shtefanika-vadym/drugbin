import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const PrivacyBoxWrapper = styled.div`
  ${flex({ gap: '16px', justifyContent: 'center', alignItems: 'center' })};
  padding: 16px;
  background-color: #f0f2f4;
`

export const Description = styled.p`
  ${textVariant('bodyXS')};
  font-weight: 400;
  color: #011640;
`

export const Icon = styled.img``
