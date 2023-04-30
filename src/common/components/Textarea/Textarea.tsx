import React from 'react'
import type { InputHTMLAttributes } from 'react'

import { Label, TextareaWrapper, TextareaStyle } from './Textarea.styled'

export interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  valid?: boolean
}

export const Textarea = React.forwardRef<HTMLInputElement, LabeledInputProps>((props, ref) => {
  const { label = '' } = props
  console.log('a', props, ref)
  return (
    <TextareaWrapper>
      <Label>{label}</Label>
      <TextareaStyle />
    </TextareaWrapper>
  )
})
