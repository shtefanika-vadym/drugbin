import useBreakpoints from 'common/hooks/useBreakpoints'
import { useCollection } from 'common/hooks/collections'
import { useAuthState } from 'common/state/auth.state'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import {
  CLASSIFICATION_GRID,
  ClassificationHeaderCells,
  ClassificationRows,
} from 'components/admin/ClassificationRows'
import { fmtDateTime } from 'components/admin/format'
import { TableBody, TableHeader } from 'components/admin/list.styled'
import { Button } from 'components/ui/Button/Button'
import { Table } from 'components/ui/Table/Table'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { Text } from 'components/ui/Text/Text'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BackRow,
  CardHead,
  CardTitle,
  DefGrid,
  DefItem,
  IdentityCard,
  Sections,
  TableWrap,
} from './CollectionDetail.styled'
import { CollectionStatusPill } from './CollectionStatusPill'

interface Props {
  /** Route prefix — `/colectari` (hospital) or `/admin/colectari` (admin). */
  basePath: string
}

/** One drop-off session: an identity-card header + the identifications made during it. */
export const CollectionDetail: React.FC<Props> = ({ basePath }) => {
  const { collectionId = '' } = useParams()
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()
  const isAdmin = useAuthState((s) => s.role) === 'admin'
  const { collection, items, isLoading, isError } = useCollection(collectionId)

  if (isLoading || !collection) {
    return (
      <Text variant='bodyM' color={WDS_COLOR_GREY}>
        {isError ? 'Se pregătește colectarea… pagina se actualizează automat.' : 'Se încarcă…'}
      </Text>
    )
  }

  return (
    <Sections>
      <BackRow>
        <Button variant='secondary' size='XS' onClick={() => navigate(basePath)}>
          ← Înapoi
        </Button>
      </BackRow>

      <IdentityCard>
        <CardHead>
          <CardTitle>Colectare {collection.id}</CardTitle>
          <CollectionStatusPill status={collection.status} />
        </CardHead>
        <DefGrid>
          <DefItem>
            <dt>Robot</dt>
            <dd>{collection.machineId}</dd>
          </DefItem>
          {isAdmin && (
            <DefItem>
              <dt>Spital</dt>
              <dd>{collection.hospitalId || '—'}</dd>
            </DefItem>
          )}
          <DefItem>
            <dt>Început</dt>
            <dd>{fmtDateTime(collection.startedAt)}</dd>
          </DefItem>
          <DefItem>
            <dt>Finalizat</dt>
            <dd>{collection.finalizedAt ? fmtDateTime(collection.finalizedAt) : '—'}</dd>
          </DefItem>
          <DefItem>
            <dt>Nr. identificări</dt>
            <dd>{collection.itemCount}</dd>
          </DefItem>
        </DefGrid>
      </IdentityCard>

      <TableWrap>
        <Text variant='titleH4'>Identificări</Text>
        <Table configDesktop={{ itemGridCols: CLASSIFICATION_GRID }} breakpoints={breakpoints}>
          <TableHeader>
            <TableHeaderRow>
              <ClassificationHeaderCells />
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            <ClassificationRows
              items={items}
              keyboardActivatable
              emptyDescription='Colectarea nu are încă identificări.'
              linkPrefix={`${basePath}/${collectionId}`}
            />
          </TableBody>
        </Table>
      </TableWrap>
    </Sections>
  )
}
