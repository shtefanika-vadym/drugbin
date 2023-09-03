import { Table } from 'antd'
import 'common/style/customTable.scss'
import { Empty } from 'components/ui/Empty/Empty'
import { isEmpty } from 'lodash-es'
import type { FC } from 'react'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import type { CustomTableProps } from './CustomTable.type'

export const CustomTable: FC<CustomTableProps> = ({ columns, dataSource, isLoading }) => {
  if (isLoading) return <DocumentsSkeleton />

  if (isEmpty(dataSource)) return <Empty />

  return (
    <Table columns={columns} dataSource={dataSource} className='customTable' pagination={false} />
  )
}
