import type { TextareaHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'

import { Label, TextareaWrapper, TextareaStyle } from './Textarea.styled'

interface LabeledTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, LabeledTextareaProps>(
  ({ label, value, name, ...rest }, ref) => {
    return (
      <TextareaWrapper>
        <Label>{label}</Label>
        <TextareaStyle ref={ref} value={value} name={name} {...rest} />
      </TextareaWrapper>
    )
  },
)
