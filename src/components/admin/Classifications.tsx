import useDialog from 'common/hooks/useDialog'
import { useClassifications } from 'common/hooks/admin'
import { useListQuery } from 'common/hooks/useListQuery'
import { useAuthState } from 'common/state/auth.state'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { Select } from 'components/ui/Select/Select'
import { Text } from 'components/ui/Text/Text'
import { ClassificationGallery } from './ClassificationGallery'
import { ClassificationTable } from './ClassificationTable'
import {
  FilterCluster,
  FilterSelect,
  SegCount,
  Segmented,
  SegmentedItem,
  SortButton,
  SyncedText,
  Toolbar,
  UtilityCluster,
  VDivider,
  ViewToggle,
} from './clasificari.styled'
import { categoryLabel } from './format'
import { Container, HeaderRow } from './list.styled'
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

const STATUS_TABS = [
  { id: '', label: 'Toate' },
  { id: 'pending', label: 'Neaprobate' },
  { id: 'approved', label: 'Aprobate' },
]
const CATEGORIES = [1, 2, 3, 4, 5, 6, 7]
const VIEW_KEY = 'clasificari.view'

/** localStorage can throw (private mode, disabled storage) — never let a preference read break the screen. */
const safeGet = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}
const safeSet = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

export const Classifications: React.FC<ClassificationsProps> = ({
  basePath = '/admin/clasificari',
  showSimulate = true,
  title = 'Clasificări',
}) => {
  const role = useAuthState((s) => s.role)
  const canApprove = role === 'admin'
  const { page, pageSize, setPage, setPageSize, getFilter, setFilter } = useListQuery()

  const view = getFilter('view') || (safeGet(VIEW_KEY) ?? 'galerie')
  const setView = (next: string) => {
    setFilter('view', next)
    safeSet(VIEW_KEY, next)
  }

  const status = getFilter('status')
  const category = getFilter('category')
  const confidence = getFilter('confidence')
  const sortField: 'created' | 'duration' =
    getFilter('sort') === 'duration' ? 'duration' : 'created'
  const dir: 'asc' | 'desc' = getFilter('dir') === 'asc' ? 'asc' : 'desc'

  const filters = {
    status: status || undefined,
    category: category || undefined,
    confidence: confidence || undefined,
    sort: sortField === 'duration' ? 'duration' : undefined,
    dir: sortField === 'duration' ? dir : undefined,
  }
  const { items, total, totalPages, counts, isLoading, refresh } = useClassifications(
    filters,
    page,
    pageSize,
  )
  const [SimulateDlg, simulateProps, toggleSimulate] = useDialog()

  /** Cycle: created → duration ascending → duration descending → created. */
  const cycleSort = () => {
    if (sortField !== 'duration') {
      setFilter('sort', 'duration')
      setFilter('dir', 'asc')
      return
    }
    if (dir === 'asc') {
      setFilter('dir', 'desc')
      return
    }
    setFilter('sort', '')
    setFilter('dir', '')
  }
  const sortArrow = sortField === 'duration' ? (dir === 'asc' ? '↑' : '↓') : '↑↓'

  const tabCount = (id: string) =>
    id === 'pending' ? counts.pending : id === 'approved' ? counts.approved : counts.total

  return (
    <Container>
      <HeaderRow>
        <div>
          <Text variant='titleH4'>{title}</Text>
          <Text variant='bodyS' color={WDS_COLOR_GREY}>
            Rezultatele AI așteaptă revizuirea unui farmacist înainte de a intra în index.
          </Text>
        </div>
        <UtilityCluster>
          <SyncedText>Sincronizat</SyncedText>
          <RefreshButton onRefresh={refresh} />
          {showSimulate && (
            <>
              <VDivider />
              <Button variant='secondary' onClick={() => toggleSimulate(true)}>
                Simulează o clasificare
              </Button>
            </>
          )}
        </UtilityCluster>
      </HeaderRow>

      <Toolbar>
        <Segmented role='tablist' aria-label='Stare'>
          {STATUS_TABS.map((t) => {
            const active = status === t.id
            return (
              <SegmentedItem
                key={t.id || 'all'}
                type='button'
                role='tab'
                aria-selected={active}
                $active={active}
                onClick={() => setFilter('status', t.id)}>
                {t.label}
                <SegCount $active={active}>{tabCount(t.id)}</SegCount>
              </SegmentedItem>
            )
          })}
        </Segmented>
        <FilterCluster>
          <FilterSelect>
            <Select
              aria-label='Categorie'
              value={category}
              onChange={(e) => setFilter('category', e.target.value)}>
              <option value=''>Toate categoriile</option>
              {CATEGORIES.map((n) => (
                <option key={n} value={n}>
                  {categoryLabel(n)}
                </option>
              ))}
            </Select>
          </FilterSelect>
          <FilterSelect>
            <Select
              aria-label='Încredere'
              value={confidence}
              onChange={(e) => setFilter('confidence', e.target.value)}>
              <option value=''>Orice încredere</option>
              <option value='high'>Ridicată</option>
              <option value='low'>Scăzută</option>
              <option value='none'>Fără scor</option>
            </Select>
          </FilterSelect>
          <SortButton type='button' onClick={cycleSort}>
            Durată {sortArrow}
          </SortButton>
          <ViewToggle>
            <Button
              variant={view === 'galerie' ? 'primary' : 'secondary'}
              size='XS'
              onClick={() => setView('galerie')}>
              Galerie
            </Button>
            <Button
              variant={view === 'tabel' ? 'primary' : 'secondary'}
              size='XS'
              onClick={() => setView('tabel')}>
              Tabel
            </Button>
          </ViewToggle>
        </FilterCluster>
      </Toolbar>

      {view === 'tabel' ? (
        <ClassificationTable
          items={items}
          linkPrefix={basePath}
          canApprove={canApprove}
          isLoading={isLoading}
          sort={{ field: sortField, dir }}
          onSort={cycleSort}
          onChanged={refresh}
        />
      ) : (
        <ClassificationGallery
          items={items}
          linkPrefix={basePath}
          canApprove={canApprove}
          isLoading={isLoading}
          onChanged={refresh}
        />
      )}

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
