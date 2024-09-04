import useBreakpoints from 'common/hooks/useBreakpoints'
import { usePagination } from 'common/hooks/usePagination'
import { Empty } from 'components/ui/Empty/Empty'
import { Input } from 'components/ui/Input/Input'
import { Pagination } from 'components/ui/Pagination/Pagination'
import { Table } from 'components/ui/Table/Table'
import { EmptyCell } from 'components/ui/Table/TableCell.styled'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { Text } from 'components/ui/Text/Text'
import { ChangeEvent, useCallback, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import {
  Container,
  InputWrapper,
  PaginationContainer,
  TableBody,
  TableHeader,
} from './Management.styled'
import { ManagementListRow } from './ManagementListRow'
import { useManagementEntries } from './useManagementEntries'

export const Management = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [expanded, setExpanded] = useState<number | null>(null)
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  const breakpoints = useBreakpoints()
  const { currentPage, setCurrentPage } = usePagination()
  const { data, totalPages, isLoading, mutate } = useManagementEntries({
    page: currentPage,
    search: debouncedSearchTerm,
  })

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      setCurrentPage(1)
      setExpanded(null)
    },
    [setCurrentPage],
  )

  const handleChangePage = useCallback(
    (event: number) => {
      setCurrentPage(event)
      setExpanded(null)
    },
    [setCurrentPage],
  )

  const toggle = useCallback(
    (rowIndex: number) => {
      if (expanded === rowIndex) {
        setExpanded(null)
      } else {
        setExpanded(rowIndex)
      }
    },
    [expanded],
  )

  const renderRow = useCallback(() => {
    if (data.length === 0) return <Empty />

    return data.map((item, index) => (
      <ManagementListRow
        key={index}
        data={item}
        expanded={expanded === item.key}
        onToggle={() => toggle(item.key)}
        mutate={mutate}
      />
    ))
  }, [data, mutate, expanded, toggle])

  return (
    <Container>
      <Text variant='titleH4'>Gestionare intrări</Text>
      <InputWrapper>
        <Input type='search' placeholder='Cauta' onChange={handleSearch} />
      </InputWrapper>
      <Table
        configDesktop={{
          itemGridCols:
            'minmax(0, 0.5fr) minmax(0, 2.5fr) minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 2fr)',
        }}
        isLoading={isLoading}
        breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <EmptyCell />
            <TableHeaderCell>Nume</TableHeaderCell>
            <TableHeaderCell>Data creării</TableHeaderCell>
            <TableHeaderCell>Total medicamente</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Acțiuni</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderRow()}</TableBody>
      </Table>
      <PaginationContainer>
        <Pagination
          current={currentPage}
          total={totalPages}
          maxVisible={10}
          onChange={handleChangePage}
        />
      </PaginationContainer>
    </Container>
  )
}
