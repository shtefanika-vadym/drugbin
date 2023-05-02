import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const Title = styled.h1`
  ${textVariant('titleH5')};
  color: #01102e;
`

export const Text = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
  padding: 8px 0;
`

export const QRCodeWrapper = styled.div`
  ${flex({ direction: 'column', alignItems: 'center', gap: '24px' })};
`

export const QRCode = styled.img``
