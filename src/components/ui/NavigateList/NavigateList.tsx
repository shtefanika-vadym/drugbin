import { getLastElement } from 'common/utils/utils'
import { toLower } from 'lodash'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateListWrapper, Tab } from './NavigateList.styled'

interface NavigateListProps {
  list: string[]
}

export const NavigateList: FC<NavigateListProps> = ({ list }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleChangTab = (tab: string) => {
    switch (tab) {
      case 'Collect':
        return navigate('/history/collect')
      case 'All':
        return navigate('/history/all')
    }
  }

  return (
    <NavigateListWrapper>
      {list.map((navigateItem: string, key: number) => {
        return (
          <Tab
            key={key}
            isActive={getLastElement(location.pathname) === toLower(navigateItem)}
            onClick={() => handleChangTab(navigateItem)}>
            {navigateItem}
          </Tab>
        )
      })}
    </NavigateListWrapper>
  )
}
