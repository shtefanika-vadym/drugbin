import type { FC } from 'react'

import { Table } from 'antd'

import type { CustomTableProps } from './CustomTable.type'

import 'common/style/customTable.scss'
import Spinner from 'components/ui/Spinner/Spinner'

export const CustomTable: FC<CustomTableProps> = ({ columns, dataSource, isLoading }) => {
  return (
    <>
      {!isLoading ? (
        <Table
          columns={columns}
          dataSource={dataSource}
          className='customTable'
          pagination={false}
        />
      ) : (
        <Spinner isLoading={isLoading} />
      )}
    </>
  )
}
