import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_012_PX, WDS_SIZE_016_PX } from 'common/style/size'
import styled from 'styled-components'

export const GeneratorContent = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  max-width: 400px;
`

export const Title = styled.h1`
  ${textVariant('titleH5')};
`

export const Details = styled.p`
  ${textVariant('bodyS')};
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_012_PX })};
`

export const Span = styled.span`
  font-weight: bold;
`
