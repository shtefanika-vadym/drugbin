import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const ContentStatus = styled.div`
  ${flex({ direction: 'column', gap: '40px' })};
`

export const Title = styled.p`
  ${textVariant('titleH4')};
`

export const BorderStyle = styled.div`
  border-top: 1px solid #e5e5ea;
`

export const RecivedText = styled.p`
  ${textVariant('subheading')};
  padding: 0 0 10px 0;
`

export const IconWrapper = styled.div`
  ${flex({ gap: '16px' })};
`

export const Icon = styled.img`
  cursor: pointer;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 40px;
  gap: 12px;
`
