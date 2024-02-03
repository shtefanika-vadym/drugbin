import { Pagination } from 'antd'
import { useGetEntriesQuery, useGetEntriesSearchQuery } from 'api/management'
import { DEFAULT_PAGE_SIZE } from 'common/config'
import type { ManagementData } from 'common/interfaces/ManagementTypes'
import { scrollToTop } from 'common/utils/utils'
import { Button } from 'components/ui/Button/Button'
import { CustomTable } from 'components/ui/CustomTable/CustomTable'
import { columnsManagement } from 'components/ui/CustomTable/TableColumns'
import { ExpandedRow } from 'components/ui/ExpandedRow/ExpandedRow'
import { ChevronDown, ChevronUp } from 'components/ui/Icon'
import { Input } from 'components/ui/Input/Input'
import { toString } from 'lodash-es'
import type { ChangeEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Container, ExpandIcon, InputWrapper, Title } from './Management.styled'

export const Management: React.FC<{ searchValue?: string }> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = useMemo(() => Number(searchParams.get('page')) || 1, [searchParams])

  const { data: entries, isLoading: isEntriesLoading } = useGetEntriesQuery(currentPage)
  const { data: searchEntries, isLoading: isSearchLoading } = useGetEntriesSearchQuery(
    {
      search: debouncedSearchTerm,
      page: currentPage,
    },
    {
      skip: !debouncedSearchTerm,
    },
  )
  const currentEntries = useMemo(
    () => (!!debouncedSearchTerm ? searchEntries : entries),
    [debouncedSearchTerm, entries, searchEntries],
  )

  const handleChangePage = useCallback(
    (value: number) => {
      searchParams.set('page', toString(value))
      setSearchParams(searchParams)
      scrollToTop()
    },
    [searchParams, setSearchParams],
  )

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      searchParams.set('page', toString(1))
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams],
  )

  return (
    <Container>
      <Title>Gestionare intrări</Title>
      <InputWrapper>
        <Input type='search' placeholder='Cauta' onChange={handleSearch} />
      </InputWrapper>
      <CustomTable
        columns={columnsManagement}
        dataSource={currentEntries?.data}
        expandRowByClick
        expandable={{
          expandedRowRender: (record: ManagementData) => <ExpandedRow data={record?.drugList} id={record.user.id} />,
          expandIcon: ({ expanded, onExpand, record }: any) =>
            expanded ? (
              <ExpandIcon onClick={(e) => onExpand(record, e)}>
                <Button variant='secondary' size='S-round'>
                  <ChevronUp width={14} height={14} />
                </Button>
              </ExpandIcon>
            ) : (
              <ExpandIcon onClick={(e) => onExpand(record, e)}>
                <Button variant='secondary' size='S-round'>
                  <ChevronDown width={14} height={14} />
                </Button>
              </ExpandIcon>
            ),
        }}
        isLoading={isEntriesLoading || isSearchLoading}
      />
      <Pagination
        hideOnSinglePage
        current={currentPage}
        defaultCurrent={currentPage}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        total={currentEntries?.totalItems}
        onChange={handleChangePage}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </Container>
  )
}
