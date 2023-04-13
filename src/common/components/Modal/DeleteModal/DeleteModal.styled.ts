import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const ContentDelete = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const HeaderDelete = styled.div`
  ${flex({ gap: '24px' })};
`

export const Icon = styled.img``

export const WrapperText = styled.div`
  ${flex({ direction: 'column', gap: '8px' })};
  max-width: 397px;
`

export const Title = styled.p`
  ${textVariant('titleH5')};
  color: #01102e;
`

export const Text = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: '16px', justifyContent: 'center' })};
`

export const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  background: #ebf0fb;
  border-radius: 8px;
`
