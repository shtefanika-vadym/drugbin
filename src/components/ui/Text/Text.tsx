import { WDS_COLOR_BLACK } from 'common/style/colors'
import type { TextVariantType } from 'common/style/mixins/typography.mixin'
import type { ReactNode } from 'react'
import { StyledText } from './Text.styled'

interface TextProps {
  textVariant: TextVariantType
  color?: string
  children: ReactNode
}

export const Text: React.FC<TextProps> = ({ textVariant, color = WDS_COLOR_BLACK, children }) => {
  return (
    <StyledText variant={textVariant} color={color}>
      {children}
    </StyledText>
  )
}
