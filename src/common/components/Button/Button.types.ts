import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'square' | 'round' | 'empty'
export type ButtonSize = 'S' | 'S-square' | 'S-round'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export type StyledButtonProps = Required<Pick<ButtonProps, 'variant' | 'size'>>
