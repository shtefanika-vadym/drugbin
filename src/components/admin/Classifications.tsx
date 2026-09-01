import useBreakpoints from 'common/hooks/useBreakpoints'
import useDialog from 'common/hooks/useDialog'
import { useListQuery } from 'common/hooks/useListQuery'
import { useClassifications } from 'common/hooks/admin'
import { Button } from 'components/ui/Button/Button'
import { Empty } from 'components/ui/Empty/Empty'
import { Select } from 'components/ui/Select/Select'
import { Table } from 'components/ui/Table/Table'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { TableRow } from 'components/ui/Table/TableRow'
import { Text } from 'components/ui/Text/Text'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  FilterBox,
  Filters,
  HeaderActions,
  HeaderRow,
  TableBody,
  TableHeader,
} from './list.styled'
import { PageControls } from './PageControls'
import { RefreshButton } from './RefreshButton'
import { SimulateDialog } from './SimulateDialog'
import { StatusTag } from './StatusTag'
import { CONFIDENCE_TONE, categoryLabel, fmtDate, fmtMs, fmtTime } from './format'

const GRID =
  'minmax(0, 1.4fr) minmax(0, 0.6fr) minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1.6fr) minmax(0, 1fr)'

interface ClassificationsProps {
  /** Route prefix for the detail link. `/admin/clasificari` (admin) or `/gestionare` (hospital). */
  basePath?: string
  /** The "Simulează" button — admin console only. */
  showSimulate?: boolean
  title?: string
}

export const Classifications: React.FC<ClassificationsProps> = ({
  basePath = '/admin/clasificari',
  showSimulate = true,
  title = 'Clasificări',
}) => {
  const breakpoints = useBreakpoints()
  const { page, pageSize, setPage, setPageSize, getFilter, setFilter } = useListQuery()
  const filters = {
    tier: getFilter('tier') || undefined,
    confidence: getFilter('confidence') || undefined,
  }
  const { items, total, totalPages, isLoading, refresh } = useClassifications(
    filters,
    page,
    pageSize,
  )
  const navigate = useNavigate()
  const [SimulateDlg, simulateProps, toggleSimulate] = useDialog()

  const renderRows = () => {
    if (!isLoading && items.length === 0) return <Empty description='Nicio clasificare.' />
    return items.map((c) => (
      <TableRow key={c.imageId} onClick={() => navigate(`${basePath}/${c.imageId}`)}>
        <TableCell label={fmtTime(c.createdAt)}>{fmtDate(c.createdAt)}</TableCell>
        <TableCell>{c.tier}</TableCell>
        <TableCell>
          <StatusTag tone={CONFIDENCE_TONE[c.confidence] ?? 'muted'}>{c.confidence}</StatusTag>
        </TableCell>
        <TableCell label={c.drugAtc || undefined}>{c.drugName || '—'}</TableCell>
        <TableCell>{categoryLabel(c.drugCategory)}</TableCell>
        <TableCell>{fmtMs(c.latencyTotalMs)}</TableCell>
      </TableRow>
    ))
  }

  return (
    <Container>
      <HeaderRow>
        <Text variant='titleH4'>{title}</Text>
        <HeaderActions>
          <RefreshButton onRefresh={refresh} />
          {showSimulate && <Button onClick={() => toggleSimulate(true)}>Simulează</Button>}
        </HeaderActions>
      </HeaderRow>

      <Filters>
        <FilterBox>
          <Select
            label='Tier'
            value={filters.tier ?? ''}
            onChange={(e) => setFilter('tier', e.target.value)}>
            <option value=''>toate</option>
            <option value='1'>1 — vector</option>
            <option value='2'>2 — vision</option>
          </Select>
        </FilterBox>
        <FilterBox>
          <Select
            label='Încredere'
            value={filters.confidence ?? ''}
            onChange={(e) => setFilter('confidence', e.target.value)}>
            <option value=''>toate</option>
            <option value='high'>high</option>
            <option value='low'>low</option>
            <option value='none'>none</option>
          </Select>
        </FilterBox>
      </Filters>

      <Table configDesktop={{ itemGridCols: GRID }} isLoading={isLoading} breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Data</TableHeaderCell>
            <TableHeaderCell>Tier</TableHeaderCell>
            <TableHeaderCell>Încredere</TableHeaderCell>
            <TableHeaderCell>Medicament</TableHeaderCell>
            <TableHeaderCell>Categorie</TableHeaderCell>
            <TableHeaderCell>Durată</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>

      <PageControls
        total={total}
        noun={['clasificare', 'clasificări']}
        page={page}
        totalPages={totalPages}
        onPage={setPage}
        pageSize={pageSize}
        onPageSize={setPageSize}
      />

      {showSimulate && (
        <SimulateDlg {...simulateProps}>
          <SimulateDialog close={() => toggleSimulate(false)} onDone={refresh} />
        </SimulateDlg>
      )}
    </Container>
  )
}
