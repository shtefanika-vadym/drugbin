import { FC, ReactNode } from 'react'
import { CopyText } from '../CopyText/CopyText'
import { CellVariant } from './Table.types'
import { Label, StyledTableCell, Value } from './TableCell.styled'

interface TableCellProps {
  label?: string
  variant?: CellVariant
  children?: ReactNode
  isCopy?: boolean
}

export const TableCell: FC<TableCellProps> = ({ children, label, variant, isCopy = false }) => {

  const renderLabel = () => {
    if (isCopy)
      return (
        <CopyText value={label}>
          <Label>{label}</Label>
        </CopyText>
      )

    return <Label>{label}</Label>
  } 

  return (
    <StyledTableCell variant={variant}>
      <Value>{children}</Value>
      {renderLabel()}
    </StyledTableCell>
  )
}
