import type { FC } from 'react'

import { QuickActions } from 'common/components/QuickActions/QuickActions'
import { Tag } from 'common/components/Tag/Tag'

import { ContentRecycleBox, Name, Text } from './RecycleBox.styled'
import type { IRecycleBoxProps } from './RecycleBox.type'

export const RecycleBox: FC<IRecycleBoxProps> = ({ pharma, quantity, status, callbackOnClick }) => {
  return (
    <ContentRecycleBox onClick={callbackOnClick}>
      <Name>{pharma}</Name>
      <Text>{quantity} g</Text>
      <Tag variant='pending'>{status}</Tag>
      <QuickActions id='1' variant='recycle' />
    </ContentRecycleBox>
  )
}
