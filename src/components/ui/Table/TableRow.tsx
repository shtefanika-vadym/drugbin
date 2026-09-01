import React, { FC, ReactNode, useContext } from 'react'
import { TableContext } from './TableContext'
import { StyledTableRow } from './TableRow.styled'

interface TableRowProps {
  isOpen?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const TableRow: FC<TableRowProps> = ({ children, isOpen = false, onClick }) => {
  const config = useContext(TableContext)

  return (
    <StyledTableRow config={config} isOpen={isOpen} clickable={!!onClick} onClick={onClick}>
      {children}
    </StyledTableRow>
  )
}
