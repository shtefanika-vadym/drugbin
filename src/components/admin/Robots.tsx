import useBreakpoints from 'common/hooks/useBreakpoints'
import useDialog from 'common/hooks/useDialog'
import { useListQuery } from 'common/hooks/useListQuery'
import { useMachines } from 'common/hooks/admin'
import { Machine } from 'common/types/manage.types'
import { Button } from 'components/ui/Button/Button'
import { Empty } from 'components/ui/Empty/Empty'
import { Input } from 'components/ui/Input/Input'
import { Table } from 'components/ui/Table/Table'
import { EmptyCell } from 'components/ui/Table/TableCell.styled'
import { TableCell } from 'components/ui/Table/TableCell'
import { CellVariant } from 'components/ui/Table/Table.types'
import { TableHeaderCell } from 'components/ui/Table/TableHeaderCell'
import { TableHeaderRow } from 'components/ui/Table/TableHeaderRow'
import { TableRow } from 'components/ui/Table/TableRow'
import { Text } from 'components/ui/Text/Text'
import { ViewIcon } from 'components/ui/Icon'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import {
  Container,
  HeaderActions,
  HeaderRow,
  InputWrapper,
  TableBody,
  TableHeader,
} from './list.styled'
import { PageControls } from './PageControls'
import { RefreshButton } from './RefreshButton'
import { RobotFormDialog } from './RobotFormDialog'
import { RobotDetailDialog } from './RobotDetailDialog'
import { SecretDialog, Secret } from './SecretDialog'
import { StatusTag } from './StatusTag'
import { fmtDate, fmtRelative } from './format'

const GRID =
  'minmax(0, 0.6fr) minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 1.7fr) minmax(0, 0.9fr) minmax(0, 1.3fr) minmax(0, 0.9fr)'

export const Robots = () => {
  const breakpoints = useBreakpoints()
  const { page, search, pageSize, setPage, setSearch, setPageSize } = useListQuery()
  const [term, setTerm] = useState(search)
  const debounced = useDebounce(term, 400)
  const { machines, total, totalPages, isLoading, mutate } = useMachines({ page, search, pageSize })

  useEffect(() => {
    if (debounced !== search) setSearch(debounced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const [FormDialog, formProps, toggleForm] = useDialog()
  const [DetailDialog, detailProps, toggleDetail] = useDialog()
  const [SecretRevealDialog, secretProps, toggleSecret] = useDialog()
  const [selected, setSelected] = useState<Machine | null>(null)
  const [secret, setSecret] = useState<Secret | null>(null)

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value),
    [],
  )

  const showSecret = useCallback(
    (s: Secret) => {
      setSecret(s)
      toggleSecret(true)
      mutate()
    },
    [toggleSecret, mutate],
  )

  const renderRows = () => {
    if (!isLoading && machines.length === 0)
      return <Empty description='Niciun robot înregistrat.' />
    return machines.map((m) => (
      <TableRow key={m.machineId}>
        <TableCell variant={CellVariant.ACTION}>
          <Button
            variant='secondary'
            size='S-round'
            onClick={() => {
              setSelected(m)
              toggleDetail(true)
            }}>
            <ViewIcon width={14} height={14} />
          </Button>
        </TableCell>
        <TableCell label={m.machineId} isCopy>
          {m.label}
        </TableCell>
        <TableCell>{m.site || '—'}</TableCell>
        <TableCell>{m.hospitalName || <StatusTag tone='muted'>Neasignat</StatusTag>}</TableCell>
        <TableCell>
          {m.enabled ? (
            <StatusTag tone='ok'>Activ</StatusTag>
          ) : (
            <StatusTag tone='danger'>Dezactivat</StatusTag>
          )}
        </TableCell>
        <TableCell>{fmtRelative(m.lastSeenAt)}</TableCell>
        <TableCell>{fmtDate(m.createdAt)}</TableCell>
      </TableRow>
    ))
  }

  return (
    <Container>
      <HeaderRow>
        <Text variant='titleH4'>Roboți</Text>
        <HeaderActions>
          <RefreshButton onRefresh={() => mutate()} />
          <Button onClick={() => toggleForm(true)}>Adaugă robot</Button>
        </HeaderActions>
      </HeaderRow>

      <InputWrapper>
        <Input
          type='search'
          placeholder='Caută după etichetă sau id'
          defaultValue={search}
          onChange={handleSearch}
        />
      </InputWrapper>

      <Table configDesktop={{ itemGridCols: GRID }} isLoading={isLoading} breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <EmptyCell />
            <TableHeaderCell>Etichetă</TableHeaderCell>
            <TableHeaderCell>Locație</TableHeaderCell>
            <TableHeaderCell>Spital</TableHeaderCell>
            <TableHeaderCell>Stare</TableHeaderCell>
            <TableHeaderCell>Ultima activitate</TableHeaderCell>
            <TableHeaderCell>Creat</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>

      <PageControls
        total={total}
        noun={['robot', 'roboți']}
        page={page}
        totalPages={totalPages}
        onPage={setPage}
        pageSize={pageSize}
        onPageSize={setPageSize}
      />

      <FormDialog {...formProps}>
        <RobotFormDialog
          close={() => toggleForm(false)}
          onCreated={(s) => {
            toggleForm(false)
            showSecret(s)
          }}
        />
      </FormDialog>

      <DetailDialog {...detailProps}>
        {selected && (
          <RobotDetailDialog
            machine={selected}
            close={() => toggleDetail(false)}
            onChanged={(m) => {
              setSelected(m)
              mutate()
            }}
            onDeleted={() => {
              toggleDetail(false)
              mutate()
            }}
            onSecret={(s) => {
              toggleDetail(false)
              showSecret(s)
            }}
          />
        )}
      </DetailDialog>

      <SecretRevealDialog {...secretProps}>
        {secret && <SecretDialog secret={secret} close={() => toggleSecret(false)} />}
      </SecretRevealDialog>
    </Container>
  )
}
