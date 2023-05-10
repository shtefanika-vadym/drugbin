import { NavigateListWrapper, Tab } from './NavigateList.styled'

const LIST = ['History', 'Collect']

export const NavigateList = ({ selectedList, setSelectedList }: any) => {
  return (
    <NavigateListWrapper>
      {LIST.map((navigateItem: string) => {
        return (
          <Tab
            isActive={selectedList === navigateItem}
            onClick={() => setSelectedList(navigateItem)}>
            {navigateItem}
          </Tab>
        )
      })}
    </NavigateListWrapper>
  )
}
