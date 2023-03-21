import type { ChangeEvent } from 'react'

import type { TYPE_FORM_CONTROL } from 'common/types/formControlType'

export interface IFormControl {
  name: string
  type?: string
  style?: object
  options?: string[]
  label?: string | JSX.Element
  control: TYPE_FORM_CONTROL
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
