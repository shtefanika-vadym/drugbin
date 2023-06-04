import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import styled from 'styled-components'

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
export const Text = styled.p`
  ${textVariant('bodyM')};
  color: #000611;
`

export const ButtoWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })}
`
