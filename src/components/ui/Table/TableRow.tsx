import React, { FC, KeyboardEvent, ReactNode, useContext } from 'react'
import { TableContext } from './TableContext'
import { StyledTableRow } from './TableRow.styled'

interface TableRowProps {
  isOpen?: boolean
  children?: ReactNode
  onClick?: () => void
  /**
   * Opt-in keyboard activation: renders the row as `role="button"` with `tabIndex={0}` and fires
   * `onClick` on Enter/Space. Off by default so existing rows (admin lists) are unaffected.
   */
  keyboardActivatable?: boolean
}

export const TableRow: FC<TableRowProps> = ({
  children,
  isOpen = false,
  onClick,
  keyboardActivatable = false,
}) => {
  const config = useContext(TableContext)
  const interactive = keyboardActivatable && !!onClick

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (!onClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <StyledTableRow
      config={config}
      isOpen={isOpen}
      clickable={!!onClick}
      interactive={interactive}
      onClick={onClick}
      onKeyDown={interactive ? handleKeyDown : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}>
      {children}
    </StyledTableRow>
  )
}
