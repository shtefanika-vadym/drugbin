import React, { FC, ReactNode, useContext } from 'react'
import { TableContext } from './TableContext'
import { StyledTableHeaderRow } from './TableHeaderRow.styled'

interface TableHeaderRowProps {
  children?: ReactNode
}

export const TableHeaderRow: FC<TableHeaderRowProps> = ({ children }) => {
  const config = useContext(TableContext)

  return <StyledTableHeaderRow config={config}>{children}</StyledTableHeaderRow>
}
