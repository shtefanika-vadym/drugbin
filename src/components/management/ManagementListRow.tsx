import { ManagementEntry } from 'common/types/managament.types'
import { TableCell } from 'components/ui/Table/TableCell'
import { TableRow } from 'components/ui/Table/TableRow'
import { Tag } from 'components/ui/Tag/Tag'
import { TagVriantType } from 'components/ui/Tag/Tag.type'
import { ManagementActionCell } from './ManagementActionCell'
import { Container, ExpandedContainer } from './ManagementListRow.styled'
import { ManagementRowExpanded } from './ManagementRowExpanded'
import { ManagementToggleCell } from './ManagementToggleCell'

interface ManagementListRowProps {
  data: ManagementEntry
  expanded: boolean
  onToggle: () => void
  mutate: () => void
}

export const ManagementListRow: React.FC<ManagementListRowProps> = ({
  data,
  onToggle,
  expanded,
  mutate,
}) => {
  const { user, createAt, quantity, status, drugList } = data

  return (
    <Container>
      <TableRow isOpen={expanded}>
        <ManagementToggleCell toggle={onToggle} expanded={expanded} />
        <TableCell label={user.id} isCopy>{user.name}</TableCell>
        <TableCell label={createAt.time}>{createAt.date}</TableCell>
        <TableCell>{quantity}</TableCell>
        <TableCell>
          <Tag variant={status as TagVriantType} />
        </TableCell>
        <TableCell>
          <ManagementActionCell id={user.id} status={status} mutate={mutate} />
        </TableCell>
      </TableRow>
      {expanded && (
        <ExpandedContainer>
          <ManagementRowExpanded drugList={drugList} id={user.id} />
        </ExpandedContainer>
      )}
    </Container>
  )
}

