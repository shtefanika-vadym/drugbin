import type { TextVariantType } from 'common/style/mixins/typography.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import styled from 'styled-components'

export const StyledText = styled.p<{ variant: TextVariantType; color: string }>`
  ${({ variant }) => textVariant(variant)};
  color: ${({ color }) => color};
`
