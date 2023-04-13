import type { ColumnsType } from 'antd/lib/table'

import { QuickActions } from 'common/components/QuickActions/QuickActions'
import { Tag } from 'common/components/Tag/Tag'

import { SubtitleWrapper, NameWrapper } from './CustomTable.styled'

export const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: ({ name, id }) => (
      <NameWrapper>
        {name} <SubtitleWrapper>{id}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Recycle time',
    dataIndex: 'recycle',
    key: 'recycle',
    render: ({ data, time }) => (
      <NameWrapper>
        {data} <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Pack',
    dataIndex: 'pack',
    key: 'pack',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag variant={status}>{status}</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (id: string) => <QuickActions id={id} />,
  },
]

export const columnsRecycle: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: ({ name, id }) => (
      <NameWrapper>
        {name} <SubtitleWrapper>{id}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Recycle time',
    dataIndex: 'recycle',
    key: 'recycle',
    render: ({ data, time }) => (
      <NameWrapper>
        {data} <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Pack',
    dataIndex: 'pack',
    key: 'pack',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
]
