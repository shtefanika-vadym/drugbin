import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const LocationInformationWrapper = styled.div`
  ${flex({ direction: 'column', gap: '32px' })}
`

export const PharmaCardDetails = styled.div`
  ${flex({ direction: 'column', gap: '16px' })};
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
  padding: 24px 16px;
`

export const Schedule = styled.p`
  ${textVariant('bodyS')};
  color: #011640;
`

export const Name = styled.p`
  ${textVariant('bodyM')};
  color: #000611;
`

export const Location = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
`

export const Image = styled.img``

export const Test = styled.div`
  position: absolute;
  top: 0;
  height: auto;
  background-color: red;
`

export const ButtonWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })}
`
