import useBreakpoints from 'common/hooks/useBreakpoints'
import useDialog from 'common/hooks/useDialog'
import { useListQuery } from 'common/hooks/useListQuery'
import { useClassifications } from 'common/hooks/admin'
import { Button } from 'components/ui/Button/Button'
import { Select } from 'components/ui/Select/Select'
import { Table } from 'components/ui/Table/Table'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { Text } from 'components/ui/Text/Text'
import {
  CLASSIFICATION_GRID,
  ClassificationHeaderCells,
  ClassificationRows,
} from './ClassificationRows'
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

interface ClassificationsProps {
  /** Route prefix for the detail link — the admin console mounts this at `/admin/clasificari`. */
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
  const [SimulateDlg, simulateProps, toggleSimulate] = useDialog()

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
            label='Nivel'
            value={filters.tier ?? ''}
            onChange={(e) => setFilter('tier', e.target.value)}>
            <option value=''>Toate</option>
            <option value='1'>1 — vector</option>
            <option value='2'>2 — viziune</option>
          </Select>
        </FilterBox>
        <FilterBox>
          <Select
            label='Încredere'
            value={filters.confidence ?? ''}
            onChange={(e) => setFilter('confidence', e.target.value)}>
            <option value=''>Toate</option>
            <option value='high'>Ridicată</option>
            <option value='low'>Scăzută</option>
            <option value='none'>Fără scor</option>
          </Select>
        </FilterBox>
      </Filters>

      <Table
        configDesktop={{ itemGridCols: CLASSIFICATION_GRID }}
        isLoading={isLoading}
        breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <ClassificationHeaderCells />
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <ClassificationRows items={items} isLoading={isLoading} linkPrefix={basePath} />
        </TableBody>
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
