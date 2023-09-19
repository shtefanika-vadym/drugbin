// TODO --> MOVE THIS CONST, FIND OTHER NAME
import { Button } from 'components/ui/Button/Button'
import { Input } from 'components/ui/Input/Input'
import { NavigateList } from 'components/ui/NavigateList/NavigateList'
import { debounce } from 'lodash'
import type { ChangeEvent } from 'react'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { Content, SearchWrapper, Title, TitleWrapper } from './Histyort.styled'
import { useSearchParams } from 'react-router-dom'

const LIST = ['Collect', 'All']

export const HistoryHeader: React.FC<{ setDebouncedState: (value: string) => void }> = ({
  setDebouncedState,
}) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleNavigateToAddEntry = useCallback(() => {
    navigate('/add')
  }, [])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debounceValue(e.target.value)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const debounceValue = useCallback(
    debounce((searchVal: string) => {
      setDebouncedState(searchVal)
    }, 600),
    [],
  )

  return (
    <Content>
      <TitleWrapper>
        <Title>Istoricul intrărilor</Title>
        <SearchWrapper>
          <Input
            type='search'
            placeholder='EX: Tipografiei 1'
            value={search}
            onChange={handleSearch}
          />
          <Button onClick={handleNavigateToAddEntry}>Intrare nouă</Button>
        </SearchWrapper>
      </TitleWrapper>
      <NavigateList list={LIST} />
    </Content>
  )
}
