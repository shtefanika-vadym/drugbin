import React from 'react'

import { StyledButton } from './Button.styled'
import type { ButtonProps } from './Button.types'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = 'primary', size = 'S', children, ...rest } = props
  return (
    <StyledButton ref={ref} size={size} variant={variant} {...rest}>
      {children}
    </StyledButton>
  )
})
