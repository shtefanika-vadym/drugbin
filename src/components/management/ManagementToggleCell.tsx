import { Button } from 'components/ui/Button/Button'
import { ChevronDown, ChevronUp } from 'components/ui/Icon'
import { CellVariant } from 'components/ui/Table/Table.types'
import { TableCell } from 'components/ui/Table/TableCell'

interface ManagementToggleCellProps {
  toggle: () => void
  expanded: boolean
}

export const ManagementToggleCell: React.FC<ManagementToggleCellProps> = ({ toggle, expanded }) => {
  return (
    <TableCell variant={CellVariant.ACTION}>
      <Button variant='secondary' size='S-round' onClick={toggle}>
        {expanded ? <ChevronUp width={14} height={14} /> : <ChevronDown width={14} height={14} />}
      </Button>
    </TableCell>
  )
}
