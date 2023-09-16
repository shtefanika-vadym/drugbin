import { Table } from 'antd'
import 'common/style/customTable.scss'
import { DocumentsSkeleton } from 'components/ui/DocumentsSkeleton/DocumentsSkeleton'
import { Empty } from 'components/ui/Empty/Empty'
import { isEmpty } from 'lodash-es'
import type { FC } from 'react'
import { PdfSkeleton } from 'components/ui/PdfSkeleton/PdfSkeleton'
import type { CustomTableProps } from './CustomTable.type'

export const CustomTable: FC<CustomTableProps> = ({
  columns,
  dataSource,
  isLoading,
  loadingType,
}) => {
  if (isLoading) {
    switch (loadingType) {
      case 'pdf':
        return <PdfSkeleton />
      default:
        return <DocumentsSkeleton />
    }
  }

  if (isEmpty(dataSource)) return <Empty />

  return (
    <Table columns={columns} dataSource={dataSource} className='customTable' pagination={false} />
  )
}
