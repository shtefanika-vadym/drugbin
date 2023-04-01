import React from 'react'

import { Container, RadioInput, RadioLabel } from './RadioButton.styled'
import type { RadioButtonProps } from './RadioButton.type'

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const { name, id, children, className, ...rest } = props
  const identifier = `${name}-${id}`
  return (
    <Container className={className}>
      <RadioInput ref={ref} type='radio' id={identifier} name={name} {...rest} />
      <RadioLabel htmlFor={identifier}>{children}</RadioLabel>
    </Container>
  )
})
