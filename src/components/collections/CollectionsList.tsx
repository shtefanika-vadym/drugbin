import useBreakpoints from 'common/hooks/useBreakpoints'
import { useCollections } from 'common/hooks/collections'
import { useListQuery } from 'common/hooks/useListQuery'
import { fmtDateTime } from 'components/admin/format'
import {
  Container,
  HeaderActions,
  HeaderRow,
  TableBody,
  TableHeader,
} from 'components/admin/list.styled'
import { PageControls } from 'components/admin/PageControls'
import { RefreshButton } from 'components/admin/RefreshButton'
import { Empty } from 'components/ui/Empty/Empty'
import { Input } from 'components/ui/Input/Input'
import { Table } from 'components/ui/Table/Table'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { TableRow } from 'components/ui/Table/TableRow'
import { Text } from 'components/ui/Text/Text'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { FilterBox, FilterRow, TableScroll } from './CollectionsList.styled'
import { CollectionStatusPill } from './CollectionStatusPill'

const GRID_HOSPITAL =
  'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1.4fr) minmax(0, 1fr)'
const GRID_ADMIN = `minmax(0, 1.4fr) ${GRID_HOSPITAL}`

interface Props {
  /** Route prefix for the detail link — `/colectari` (hospital) or `/admin/colectari` (admin). */
  basePath: string
  /** Admin console: show the "Spital" column + a hospital filter. Hospital view is token-scoped. */
  adminScope?: boolean
}

/** Shared "Colectări" list — the hospital and admin screens differ only by `adminScope`. */
export const CollectionsList: React.FC<Props> = ({ basePath, adminScope = false }) => {
  const breakpoints = useBreakpoints()
  const navigate = useNavigate()
  const { page, pageSize, setPage, setPageSize, getFilter, setFilter } = useListQuery()

  const [hospitalTerm, setHospitalTerm] = useState(getFilter('hospitalId'))
  const debouncedHospital = useDebounce(hospitalTerm, 400)
  const hospitalFilter = getFilter('hospitalId')

  useEffect(() => {
    if (adminScope && debouncedHospital !== hospitalFilter) setFilter('hospitalId', debouncedHospital)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedHospital])

  const filters = adminScope ? { hospitalId: hospitalFilter || undefined } : {}
  const { items, total, totalPages, isLoading, refresh } = useCollections(filters, page, pageSize)

  const handleHospital = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setHospitalTerm(e.target.value),
    [],
  )

  const renderRows = () => {
    if (!isLoading && items.length === 0) return <Empty description='Nicio colectare încă.' />
    return items.map((c) => (
      <TableRow
        key={c.id}
        keyboardActivatable
        onClick={() => navigate(`${basePath}/${c.id}`)}>
        {adminScope && <TableCell>{c.hospitalId || '—'}</TableCell>}
        <TableCell>
          <CollectionStatusPill status={c.status} />
        </TableCell>
        <TableCell>{c.machineId}</TableCell>
        <TableCell>{fmtDateTime(c.startedAt)}</TableCell>
        <TableCell>{c.finalizedAt ? fmtDateTime(c.finalizedAt) : '—'}</TableCell>
        <TableCell>{c.itemCount}</TableCell>
      </TableRow>
    ))
  }

  return (
    <Container>
      <HeaderRow>
        <Text variant='titleH4'>Colectări</Text>
        <HeaderActions>
          <RefreshButton onRefresh={refresh} />
        </HeaderActions>
      </HeaderRow>

      {adminScope && (
        <FilterRow>
          <FilterBox>
            <Input
              label='Spital'
              placeholder='Filtrează după ID spital'
              defaultValue={hospitalFilter}
              onChange={handleHospital}
            />
          </FilterBox>
        </FilterRow>
      )}

      <TableScroll>
        <Table
          configDesktop={{ itemGridCols: adminScope ? GRID_ADMIN : GRID_HOSPITAL }}
          isLoading={isLoading}
          breakpoints={breakpoints}>
          <TableHeader>
            <TableHeaderRow>
              {adminScope && <TableHeaderCell>Spital</TableHeaderCell>}
              <TableHeaderCell>Stare</TableHeaderCell>
              <TableHeaderCell>Robot</TableHeaderCell>
              <TableHeaderCell>Început</TableHeaderCell>
              <TableHeaderCell>Finalizat</TableHeaderCell>
              <TableHeaderCell>Nr. medicamente</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableScroll>

      <PageControls
        total={total}
        noun={['colectare', 'colectări']}
        page={page}
        totalPages={totalPages}
        onPage={setPage}
        pageSize={pageSize}
        onPageSize={setPageSize}
      />
    </Container>
  )
}
