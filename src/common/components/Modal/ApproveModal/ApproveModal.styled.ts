import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const Title = styled.p`
  ${textVariant('titleH5')};
  color: #01102e;
  width: 350px;
`
export const ButtonWrapper = styled.div`
  ${flex({ gap: '16px', justifyContent: 'center' })};
`
export const ContentApprove = styled.div`
  ${flex({ direction: 'column', gap: '24px', alignItems: 'center' })};
`

export const BoxIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(33, 150, 83, 0.2);
  border-radius: 8px;
`
export const TitleBox = styled.div`
  ${flex({ gap: '16px', justifyContent: 'center', alignItems: 'center' })};
`
