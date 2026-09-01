import useBreakpoints from 'common/hooks/useBreakpoints'
import useDialog from 'common/hooks/useDialog'
import { useListQuery } from 'common/hooks/useListQuery'
import { useHospitals } from 'common/hooks/admin'
import { Hospital } from 'common/types/manage.types'
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
import { Container, HeaderActions, HeaderRow, InputWrapper, TableBody, TableHeader } from './list.styled'
import { PageControls } from './PageControls'
import { RefreshButton } from './RefreshButton'
import { HospitalFormDialog } from './HospitalFormDialog'
import { HospitalDetailDialog } from './HospitalDetailDialog'
import { SecretDialog, Secret } from './SecretDialog'
import { StatusTag } from './StatusTag'
import { fmtDate, fmtTime } from './format'

const GRID = 'minmax(0, 0.6fr) minmax(0, 2.4fr) minmax(0, 1fr) minmax(0, 2fr) minmax(0, 0.7fr) minmax(0, 1fr) minmax(0, 1.3fr)'

export const Hospitals = () => {
  const breakpoints = useBreakpoints()
  const { page, search, pageSize, setPage, setSearch, setPageSize } = useListQuery()
  const [term, setTerm] = useState(search)
  const debounced = useDebounce(term, 400)
  const { hospitals, total, totalPages, isLoading, mutate } = useHospitals({ page, search, pageSize })

  useEffect(() => {
    if (debounced !== search) setSearch(debounced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const [FormDialog, formProps, toggleForm] = useDialog()
  const [DetailDialog, detailProps, toggleDetail] = useDialog()
  const [SecretRevealDialog, secretProps, toggleSecret] = useDialog()

  const [selected, setSelected] = useState<Hospital | null>(null)
  const [secret, setSecret] = useState<Secret | null>(null)

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value), [])

  const showSecret = useCallback(
    (s: Secret) => {
      setSecret(s)
      toggleSecret(true)
      mutate()
    },
    [toggleSecret, mutate],
  )

  const openDetail = useCallback(
    (h: Hospital) => {
      setSelected(h)
      toggleDetail(true)
    },
    [toggleDetail],
  )

  const renderRows = () => {
    if (!isLoading && hospitals.length === 0) return <Empty description='Niciun spital înregistrat.' />
    return hospitals.map((h) => (
      <TableRow key={h.id}>
        <TableCell variant={CellVariant.ACTION}>
          <Button variant='secondary' size='S-round' onClick={() => openDetail(h)}>
            <ViewIcon width={14} height={14} />
          </Button>
        </TableCell>
        <TableCell label={h.slug}>{h.name}</TableCell>
        <TableCell>{h.city || '—'}</TableCell>
        <TableCell>{h.loginEmail}</TableCell>
        <TableCell>{h.machineCount}</TableCell>
        <TableCell>
          {h.status === 'active' ? <StatusTag tone='ok'>Activ</StatusTag> : <StatusTag tone='danger'>Suspendat</StatusTag>}
        </TableCell>
        <TableCell label={fmtTime(h.createdAt)}>{fmtDate(h.createdAt)}</TableCell>
      </TableRow>
    ))
  }

  return (
    <Container>
      <HeaderRow>
        <Text variant='titleH4'>Spitale</Text>
        <HeaderActions>
          <RefreshButton onRefresh={() => mutate()} />
          <Button onClick={() => toggleForm(true)}>Adaugă spital</Button>
        </HeaderActions>
      </HeaderRow>

      <InputWrapper>
        <Input
          type='search'
          placeholder='Caută după nume, oraș, email'
          defaultValue={search}
          onChange={handleSearch}
        />
      </InputWrapper>

      <Table configDesktop={{ itemGridCols: GRID }} isLoading={isLoading} breakpoints={breakpoints}>
        <TableHeader>
          <TableHeaderRow>
            <EmptyCell />
            <TableHeaderCell>Nume</TableHeaderCell>
            <TableHeaderCell>Oraș</TableHeaderCell>
            <TableHeaderCell>Email autentificare</TableHeaderCell>
            <TableHeaderCell>Roboți</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Creat</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>

      <PageControls
        total={total}
        noun={['spital', 'spitale']}
        page={page}
        totalPages={totalPages}
        onPage={setPage}
        pageSize={pageSize}
        onPageSize={setPageSize}
      />

      <FormDialog {...formProps}>
        <HospitalFormDialog
          close={() => toggleForm(false)}
          onCreated={(s) => {
            toggleForm(false)
            showSecret(s)
          }}
        />
      </FormDialog>

      <DetailDialog {...detailProps}>
        {selected && (
          <HospitalDetailDialog
            hospital={selected}
            close={() => toggleDetail(false)}
            onChanged={(h) => {
              setSelected(h)
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
