import type { InputHTMLAttributes } from 'react'

type RadioType = InputHTMLAttributes<HTMLInputElement>
export type RadioButtonProps = RadioType & Required<Pick<RadioType, 'id' | 'name' | 'value'>>
