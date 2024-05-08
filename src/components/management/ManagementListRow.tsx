/* eslint-disable @typescript-eslint/no-unused-vars */
import { ManagementData } from 'common/interfaces/ManagementTypes'
import { Button } from 'components/ui/Button/Button'
import { ApproveAction, RestoreAction, TrashAction } from 'components/ui/Dialog/ActionDialog'
import { ChevronDown, ChevronUp } from 'components/ui/Icon'
import { CellVariant } from 'components/ui/Table/Table.types'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { Tag } from 'components/ui/Tag/Tag'
import { TagVriantType } from 'components/ui/Tag/Tag.type'
import { useCallback } from 'react'
import { ActionContainer, Container, ExpandedContainer } from './ManagementListRow.styled'
import { ManagementRowExpanded } from './ManagementRowExpanded'
import { useManagementActions } from './useManagementActions'

interface ManagementListRowProps {
  data: ManagementData
  expanded: boolean
  search?: string
  onToggle: () => void
}

interface ToggleCellProps {
  toggle: () => void
  expanded: boolean
}

interface ActionCellProps {
  id: string
  status: string
  search?: string
}

export const ManagementListRow: React.FC<ManagementListRowProps> = ({
  data,
  onToggle,
  expanded,
  search,
}) => {
  return (
    <Container>
      <TableRow isOpen={expanded}>
        <ToggleCell toggle={onToggle} expanded={expanded} />
        <TableCell label={data.user.id}>{data.user.name}</TableCell>
        <TableCell label={data.createAt.time}>{data.createAt.date}</TableCell>
        <TableCell>{data.quantity}</TableCell>
        <TableCell>
          <Tag variant={data.status as TagVriantType} />
        </TableCell>
        <TableCell>
          <ActionCell id={data.user.id} status={data.status} search={search} />
        </TableCell>
      </TableRow>
      {expanded && (
        <ExpandedContainer>
          <ManagementRowExpanded drugList={data.drugList} id={data.user.id} />
        </ExpandedContainer>
      )}
    </Container>
  )
}

const ToggleCell: React.FC<ToggleCellProps> = ({ toggle, expanded }) => (
  <TableCell variant={CellVariant.ACTION}>
    <Button variant='secondary' size='S-round' onClick={toggle}>
      {expanded ? <ChevronUp width={14} height={14} /> : <ChevronDown width={14} height={14} />}
    </Button>
  </TableCell>
)

const ActionCell: React.FC<ActionCellProps> = ({ id, status, search }) => {
  const { approveEntry, deleteEntry } = useManagementActions(search)
  const isApproved = status === TagVriantType.APPROVED
  const isRecycled = status === TagVriantType.RECYCLED

  const handleApproveEntry = useCallback(() => {
    approveEntry(id)
  }, [approveEntry, id])

  const handleDeleteEntry = useCallback(() => {
    deleteEntry(id)
  }, [deleteEntry, id])

  if (isRecycled) return null

  if (isApproved)
    return (
      <ActionContainer>
        <RestoreAction />
      </ActionContainer>
    )

  return (
    <ActionContainer>
      <ApproveAction onConfirm={handleApproveEntry} />
      <TrashAction onConfirm={handleDeleteEntry} />
    </ActionContainer>
  )
}
