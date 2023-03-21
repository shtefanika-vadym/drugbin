import type { ReactNode } from 'react'

import type { SelectProps } from 'antd/lib/select/index'

import type { SELECT_PROPORTION_TYPE } from 'common/types/selectType'

export interface ISelect extends SelectProps<any, any> {
  name?: string
  isLoading?: boolean
  listOptions?: any[]
  label?: string | JSX.Element
  suffixSelectedIcon?: ReactNode
  proportion?: SELECT_PROPORTION_TYPE
}
