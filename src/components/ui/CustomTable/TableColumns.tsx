import type { ColumnsType } from 'antd/lib/table'

import { QuickActions } from 'components/ui/QuickActions/QuickActions'

import { SubtitleWrapper, NameWrapper } from './CustomTable.styled'
import { Tag } from 'components/ui/Tag/Tag'

export const columnsDocumentsPV: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <NameWrapper>
        Raport Medicamente<SubtitleWrapper>{id}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Data creări',
    dataIndex: 'createAt',
    key: 'createAt',
    render: ({ data, time }) => (
      <NameWrapper>
        {data}
        <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Perioadă de timp',
    dataIndex: 'period',
    key: 'period',
    render: ({ startDate, endDate }) => (
      <NameWrapper>
        {startDate} - {endDate}
      </NameWrapper>
    ),
  },
  {
    title: 'Acțiuni',
    key: 'action',
    render: (id) => <QuickActions variant='documents' id={id} />,
  },
]

export const columns: ColumnsType<any> = [
  {
    title: 'Nume',
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
    title: 'Cantitate',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Tip (cutie/blister)',
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
    title: 'Acțiuni',
    key: 'action',
    render: (id: number) => <QuickActions id={id} />,
  },
]

export const columnsRecycle: ColumnsType<any> = [
  {
    title: 'Nume',
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
    title: 'Tip (cutie/blister)',
    dataIndex: 'pack',
    key: 'pack',
  },
  {
    title: 'Cantitate',
    dataIndex: 'quantity',
    key: 'quantity',
  },
]

export const columnsDocuments: ColumnsType<any> = [
  {
    title: 'Nume',
    dataIndex: 'name',
    key: 'name',
    render: ({ name, id }) => (
      <NameWrapper>
        {name} <SubtitleWrapper>{id}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Data creări',
    dataIndex: 'time',
    key: 'time',
    render: ({ data, time }) => (
      <NameWrapper>
        {data} <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Perioadă de timp',
    dataIndex: 'period',
    key: 'period',
  },
  {
    title: 'Acțiuni',
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
    render: (isPsycholeptic) => <NameWrapper>{isPsycholeptic && 'Psihotrop'}</NameWrapper>,
  },
]

export const columnsDocumentsShared: ColumnsType<any> = [
  {
    title: 'Nume',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <NameWrapper>
        Raport Medicamente<SubtitleWrapper>{id}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Data creări',
    dataIndex: 'createAt',
    key: 'createAt',
    render: ({ data, time }) => (
      <NameWrapper>
        {data}
        <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Perioadă de timp',
    dataIndex: 'period',
    key: 'period',
    render: ({ startDate, endDate }) => (
      <NameWrapper>
        {startDate} - {endDate}
      </NameWrapper>
    ),
  },
  {
    title: 'Acțiuni',
    key: 'action',
    render: (id) => <QuickActions variant='shared' id={id} />,
  },
]

export const columnsDocumentsTrash: ColumnsType<any> = [
  {
    title: 'Nume',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <NameWrapper>
        Raport Medicamente<SubtitleWrapper>{id}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Data creări',
    dataIndex: 'createAt',
    key: 'createAt',
    render: ({ data, time }) => (
      <NameWrapper>
        {data}
        <SubtitleWrapper>{time}</SubtitleWrapper>
      </NameWrapper>
    ),
  },
  {
    title: 'Perioadă de timp',
    dataIndex: 'period',
    key: 'period',
    render: ({ startDate, endDate }) => (
      <NameWrapper>
        {startDate} - {endDate}
      </NameWrapper>
    ),
  },
  {
    title: 'Acțiuni',
    key: 'action',
    render: (id) => <QuickActions variant='trash' id={id} />,
  },
]
