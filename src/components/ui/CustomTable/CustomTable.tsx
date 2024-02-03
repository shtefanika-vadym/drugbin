import { Table } from 'antd'
import 'common/style/customTable.scss'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import { Empty } from 'components/ui/Empty/Empty'
import { isEmpty } from 'lodash-es'
import type { FC } from 'react'
import type { CustomTableProps } from './CustomTable.type'

export const CustomTable: FC<CustomTableProps> = ({
  columns,
  dataSource,
  expandable,
  expandRowByClick,
  className = 'customTable',
  isLoading,
}) => {
  if (isLoading) return <DocumentsSkeleton />
  if (isEmpty(dataSource)) return <Empty />

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      className={className}
      pagination={false}
      expandable={expandable}
      expandRowByClick={expandRowByClick}
    />
  )
}
