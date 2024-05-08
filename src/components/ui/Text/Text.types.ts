import { TextVariantType } from 'common/style/mixins/typography.mixin'
import { HTMLAttributes, ReactNode } from 'react'

export type TextWrapperElement =
  | 'span'
  | 'div'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'li'
  | 'dd'
  | 'dt'
  | 'blockquote'
  | 'td'
  | 'th'
  | 'caption'
  | 'figcaption'
  | 'time'
  | 'address'
  | 'cite'
  | 'a'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariantType
  children?: ReactNode
  element?: TextWrapperElement
  className?: string
  transform?: 'uppercase' | 'capitalize' | 'lowercase'
}

export type StyledElementProps = Pick<TextProps, 'variant' | 'transform'>
