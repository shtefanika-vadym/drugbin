import type { FC } from 'react'

import { Table } from 'antd'

import { Spinner } from 'common/components/Spinner'

import type { CustomTableProps } from './CustomTable.type'

import 'common/style/customTable.scss'

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
