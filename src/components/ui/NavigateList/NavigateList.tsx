import type { FC } from 'react'
import { NavigateListWrapper, Tab } from './NavigateList.styled'

interface NavigateListProps {
  list: string[]
  selectedList: string
  setSelectedList: (selected: string) => void
}

export const NavigateList: FC<NavigateListProps> = ({ list, selectedList, setSelectedList }) => {
  return (
    <NavigateListWrapper>
      {list.map((navigateItem: string, key: number) => {
        return (
          <Tab
            key={key}
            isActive={selectedList === navigateItem}
            onClick={() => setSelectedList(navigateItem)}>
            {navigateItem}
          </Tab>
        )
      })}
    </NavigateListWrapper>
  )
}
