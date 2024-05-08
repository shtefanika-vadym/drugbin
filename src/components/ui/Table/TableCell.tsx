import { FC, ReactNode } from 'react'
import { Copy } from '../Copy/Copy'
import { CellVariant } from './Table.types'
import { StyledTableCell, Value } from './TableCell.styled'

interface TableCellProps {
  label?: ReactNode
  variant?: CellVariant
  children?: ReactNode
}

export const TableCell: FC<TableCellProps> = ({ children, label, variant }) => {
  return (
    <StyledTableCell variant={variant}>
      <Value>{children}</Value>
      {label && <Copy text={label as string} />}
    </StyledTableCell>
  )
}
