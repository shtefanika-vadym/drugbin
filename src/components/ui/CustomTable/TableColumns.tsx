import type { ColumnsType } from 'antd/lib/table'

import { QuickActions } from 'components/ui/QuickActions/QuickActions'

import { SubtitleWrapper, NameWrapper } from './CustomTable.styled'
import { Tag } from 'components/ui/Tag/Tag'

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
    render: () => <Tag variant='recycled'>Collected</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (id: number) => <QuickActions id={id} />,
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
    render: (id: number) => <QuickActions variant='documents' id={id} />,
  },
]

export const columnsPV: ColumnsType<any> = [
  {
    title: 'Nr.',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Nume',
    dataIndex: 'name',
    key: 'name',
    render: ({ name, drugId }) => (
      <NameWrapper>
        {name} <SubtitleWrapper>{drugId}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Tip (cutie/blister)',
    dataIndex: 'pack',
    key: 'pack',
  },
  {
    title: 'Lot',
    dataIndex: 'lot',
    key: 'lot',
  },
  {
    title: 'Cantitate',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Observatii',
    dataIndex: 'isPsycholeptic',
    key: 'isPsycholeptic',
    render: ({ isPsycholeptic }) => (
      <NameWrapper>{isPsycholeptic === true && 'Psihotrop'}</NameWrapper>
    ),
  },
  // {
  //   title: 'Recycle time',
  //   dataIndex: 'recycle',
  //   key: 'recycle',
  //   render: ({ data, time }) => (
  //     <NameWrapper>
  //       {data} <SubtitleWrapper>{time}</SubtitleWrapper>
  //     </NameWrapper>
  //   ),
  // },
  // {
  //   title: 'Quantity',
  //   dataIndex: 'quantity',
  //   key: 'quantity',
  // },
  // {
  //   title: 'Pack',
  //   dataIndex: 'pack',
  //   key: 'pack',
  // },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  //   key: 'status',
  //   render: () => <Tag variant='recycled'>Collected</Tag>,
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (id: number) => <QuickActions id={id} />,
  // },
]
