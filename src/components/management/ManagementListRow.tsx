import { ManagementEntry } from 'common/types/managament.types'
import { Button } from 'components/ui/Button/Button'
import { ChevronDown, ChevronUp } from 'components/ui/Icon'
import { CellVariant } from 'components/ui/Table/Table.types'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { Tag } from 'components/ui/Tag/Tag'
import { TagVriantType } from 'components/ui/Tag/Tag.type'
import { ManagementActionCell } from './ManagementActionCell'
import { Container, ExpandedContainer } from './ManagementListRow.styled'
import { ManagementRowExpanded } from './ManagementRowExpanded'

interface ManagementListRowProps {
  data: ManagementEntry
  expanded: boolean
  search?: string
  onToggle: () => void
  mutate: () => void
}

interface ToggleCellProps {
  toggle: () => void
  expanded: boolean
}

export const ManagementListRow: React.FC<ManagementListRowProps> = ({
  data,
  onToggle,
  expanded,
  search,
  mutate,
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
          <ManagementActionCell
            id={data.user.id}
            status={data.status}
            search={search}
            mutate={mutate}
          />
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
