import React from 'react'
import { StyledElement } from './Text.styled'
import { TextProps } from './Text.types'

export const Text: React.FC<TextProps> = ({ variant, element, className, children, ...rest }) => {
  return (
    <StyledElement variant={variant} element={element} className={className} {...rest}>
      {children}
    </StyledElement>
  )
}
