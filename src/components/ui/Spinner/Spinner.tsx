import type { FC } from 'react'

import { Spin } from 'antd'
import type { SpinProps } from 'antd/lib/spin'

import 'antd/lib/spin/style/css'

interface IProps extends SpinProps {
  isLoading: boolean
}

// TODO --> CHANGE THE DESIGNE
const Spinner: FC<IProps> = ({ isLoading, ...rest }) => {
  if (!isLoading) return null
  return <Spin {...rest} />
}
export default Spinner
