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
  Toolbar,
  UtilityCluster,
  VDivider,
  ViewToggle,
  ViewToggleItem,
} from './clasificari.styled'
import { categoryLabel } from './format'
import { Container, HeaderRow } from './list.styled'
import { PageControls } from './PageControls'
import { RefreshButton } from './RefreshButton'
import { SimulateDialog } from './SimulateDialog'
import { SyncedAgo } from './SyncedAgo'

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

/** Sort options — date first (a review queue is worked oldest- or newest-first); duration is secondary. */
const SORTS = [
  { id: '', label: 'Cele mai noi' },
  { id: 'vechi', label: 'Cele mai vechi' },
  { id: 'lente', label: 'Durată: mare → mică' },
  { id: 'rapide', label: 'Durată: mică → mare' },
]
const SORT_API: Record<string, { sort?: string; dir?: string }> = {
  '': {},
  vechi: { sort: 'created', dir: 'asc' },
  lente: { sort: 'duration', dir: 'desc' },
  rapide: { sort: 'duration', dir: 'asc' },
}

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

const GridIcon = () => (
  <svg viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
    <rect x='1' y='1' width='6' height='6' rx='1.5' />
    <rect x='9' y='1' width='6' height='6' rx='1.5' />
    <rect x='1' y='9' width='6' height='6' rx='1.5' />
    <rect x='9' y='9' width='6' height='6' rx='1.5' />
  </svg>
)
const ListIcon = () => (
  <svg viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth='1.7' aria-hidden='true'>
    <path d='M2 4h12M2 8h12M2 12h12' strokeLinecap='round' />
  </svg>
)

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
  const ord = SORT_API[getFilter('ord')] ? getFilter('ord') : ''

  const filters = {
    status: status || undefined,
    category: category || undefined,
    confidence: confidence || undefined,
    ...SORT_API[ord],
  }
  const { items, total, totalPages, counts, syncedAt, isLoading, refresh } = useClassifications(
    filters,
    page,
    pageSize,
  )
  const [SimulateDlg, simulateProps, toggleSimulate] = useDialog()

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
          <SyncedAgo at={syncedAt} />
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
          <FilterSelect>
            <Select
              aria-label='Sortare'
              value={ord}
              onChange={(e) => setFilter('ord', e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id || 'new'} value={s.id}>
                  {s.label}
                </option>
              ))}
            </Select>
          </FilterSelect>
          <ViewToggle role='tablist' aria-label='Vizualizare'>
            <ViewToggleItem
              type='button'
              role='tab'
              aria-selected={view === 'galerie'}
              aria-label='Galerie'
              $active={view === 'galerie'}
              onClick={() => setView('galerie')}>
              <GridIcon />
              Galerie
            </ViewToggleItem>
            <ViewToggleItem
              type='button'
              role='tab'
              aria-selected={view === 'tabel'}
              aria-label='Tabel'
              $active={view === 'tabel'}
              onClick={() => setView('tabel')}>
              <ListIcon />
              Tabel
            </ViewToggleItem>
          </ViewToggle>
        </FilterCluster>
      </Toolbar>

      {view === 'tabel' ? (
        <ClassificationTable
          items={items}
          linkPrefix={basePath}
          canApprove={canApprove}
          isLoading={isLoading}
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
