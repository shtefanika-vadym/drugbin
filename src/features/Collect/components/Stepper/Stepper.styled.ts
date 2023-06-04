import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const StepperWrapper = styled.div`
  width: 100%;
`

export const StepperHeader = styled.div`
  ${flex({ direction: 'column', gap: '16px', alignItems: 'center' })};
`

export const Title = styled.h1`
  ${textVariant('titleH3')};
  text-align: center;
  padding-top: 12px;
`

export const Description = styled.p`
  ${textVariant('bodyM')};
  text-align: center;
`

export const Tag = styled.p`
  ${textVariant('bodyM')};
  padding: 32px 0 16px 0;
  text-align: start;
`
