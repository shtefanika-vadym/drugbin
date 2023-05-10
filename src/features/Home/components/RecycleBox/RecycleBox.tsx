import type { FC } from 'react'

import { QuickActions } from 'common/components/QuickActions/QuickActions'
import { Tag } from 'common/components/Tag/Tag'

import { ContentRecycleBox, Name, Text } from './RecycleBox.styled'
import type { IRecycleBoxProps } from './RecycleBox.type'

export const RecycleBox: FC<IRecycleBoxProps> = ({
  pharma,
  quantity,
  status,
  id,
  refetch,
  callbackOnClick,
}) => {
  return (
    <ContentRecycleBox onClick={callbackOnClick}>
      <Name>{pharma}</Name>
      <Text>{quantity}</Text>
      <Tag variant={status}>{status === 'recycled' ? 'Approved' : 'Pending'}</Tag>
      <QuickActions id={id} variant='recycle' refetch={refetch} />
    </ContentRecycleBox>
  )
}
