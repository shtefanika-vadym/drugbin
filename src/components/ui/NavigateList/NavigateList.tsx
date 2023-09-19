import { getLastElement } from 'common/utils/utils'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateListWrapper, Tab } from './NavigateList.styled'

interface NavigateListProps {
  list: string[]
}

// TODO --> REFACTORING
export const NavigateList: FC<NavigateListProps> = ({ list }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleChangTab = (tab: string) => {
    switch (tab) {
      case 'Collect':
        return navigate('/history/collect')
      case 'All':
        return navigate('/history/all')
      case 'Proces Verbal':
        return navigate('/documents/verbal-process')
      case 'Psihotropice':
        return navigate('/documents/psychotropic')
      case 'Trimise':
        return navigate('/documents/shared')
      case 'Șterse':
        return navigate('/documents/trash')
    }
  }

  const getNavigateItems = (item: string) => {
    switch (item) {
      case 'Collect':
        return 'collect'
      case 'All':
        return 'all'
      case 'Proces Verbal':
        return 'verbal-process'
      case 'Psihotropice':
        return 'psychotropic'
      case 'Trimise':
        return 'shared'
      case 'Șterse':
        return 'trash'
    }
  }

  return (
    <NavigateListWrapper>
      {list.map((navigateItem: string, key: number) => {
        return (
          <Tab
            key={key}
            isActive={getLastElement(location.pathname) === getNavigateItems(navigateItem)}
            onClick={() => handleChangTab(navigateItem)}>
            {navigateItem}
          </Tab>
        )
      })}
    </NavigateListWrapper>
  )
}
