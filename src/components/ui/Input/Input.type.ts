import type { InputHTMLAttributes } from 'react'

export interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  valid?: boolean
}
