import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const DrugInformationWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const MultiFormWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const FormWrapper = styled.div`
  ${flex({ direction: 'column', gap: '16px' })};
  padding: 16px;
  border-radius: 16px;
  background: rgba(235, 240, 251, 0.45);
`
export const InputWrapper = styled.div``

export const Error = styled.p`
  ${textVariant('bodyXS')};
`
