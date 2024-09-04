import { useCallback, type FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateListWrapper, Tab } from './NavigateList.styled'

interface NavigateListProps {
  list: {
    name: string
    route: string
  }[]
}

export const NavigateList: FC<NavigateListProps> = ({ list }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path)
    },
    [navigate],
  )

  return (
    <NavigateListWrapper>
      {list.map((navigateItem, key) => {
        return (
          <Tab
            key={key}
            isActive={location.pathname === navigateItem.route}
            onClick={() => handleNavigate(navigateItem.route)}>
            {navigateItem.name}
          </Tab>
        )
      })}
    </NavigateListWrapper>
  )
}
