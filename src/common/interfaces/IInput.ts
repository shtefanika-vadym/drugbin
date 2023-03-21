import type { InputProps } from 'antd'

export interface IInput extends InputProps {
  name: string
  isLoading?: true
  label?: string | JSX.Element
}
