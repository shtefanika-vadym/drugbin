import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const StepperWrapper = styled.div`
  width: 100%;
`

export const StepperHeader = styled.div`
  ${flex({ direction: 'column', gap: '16px' })};
`

export const Title = styled.h1`
  ${textVariant('titleH3')};
  text-align: center;
`

export const Description = styled.p`
  ${textVariant('bodyM')};
  text-align: center;
`

export const Tag = styled.p`
  ${textVariant('bodyM')};
  padding: 16px 0 24px 0;
`

export const Text = styled.p`
  ${textVariant('bodyM')};
  color: #000611;
`
export const VerbalTitle = styled.h1`
  ${textVariant('titleH3')};
  font-weight: 700;
`

export const VerbalWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const TextBold = styled.p`
  ${textVariant('bodyM')};
  font-weight: 600;
  color: #000611;
`
