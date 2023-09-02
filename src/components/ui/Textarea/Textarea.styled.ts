import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const TextareaWrapper = styled.div`
  ${flex({ direction: 'column' })};
`

export const Label = styled.p`
  ${textVariant('bodyS')};
`

export const TextareaStyle = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  border: 1px solid #a3a6ad;
  border-radius: 8px;
  max-width: 400px;
  height: 126px;
`
