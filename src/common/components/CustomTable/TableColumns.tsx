import type { ColumnsType } from 'antd/lib/table'

import { QuickActions } from 'common/components/QuickActions/QuickActions'
import { Tag } from 'common/components/Tag/Tag'
import { UtilService } from 'common/services/utilService'

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
    render: (status) => <Tag variant={status}>{UtilService.transformText(status)}</Tag>,
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

export const columnsDocuments: ColumnsType<any> = [
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
    title: 'Creation time',
    dataIndex: 'time',
    key: 'time',
    render: ({ data, time }) => (
      <NameWrapper>
        {data} <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Time period',
    dataIndex: 'period',
    key: 'period',
  },
  {
    title: 'Action',
    key: 'action',
    render: (id: string) => <QuickActions variant='documents' id={id} />,
  },
]
