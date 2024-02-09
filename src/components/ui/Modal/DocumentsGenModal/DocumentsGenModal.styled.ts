import { WDS_COLOR_RED } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_012_PX, WDS_SIZE_016_PX } from 'common/style/size'
import styled from 'styled-components'

export const GeneratorContent = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  max-width: 400px;
`

export const Title = styled.h1`
  ${textVariant('subheading')};
  font-weight: 800;
  color: #01102e;
`

export const Details = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
`

export const DateSpan = styled.span`
  font-weight: bold !important;
  color: #1c3375;
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_012_PX })};
  padding-top: 16px;
`

export const Error = styled.p`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_RED};
`
