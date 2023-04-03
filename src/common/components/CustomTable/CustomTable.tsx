import type { FC } from 'react'

import { Table } from 'antd'

import type { CustomTableProps } from './CustomTable.type'
import 'common/style/customTable.scss'

export const CustomTable: FC<CustomTableProps> = ({ columns, dataSource }) => {
  return <Table columns={columns} dataSource={dataSource} className='customTable' />
}
