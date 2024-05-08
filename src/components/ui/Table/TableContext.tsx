import { createContext } from 'react'
import type { TableConfig } from './Table.types'
import { TableBreakpoint } from './Table.types'

export const defaultTableConfig: TableConfig = { breakpoint: TableBreakpoint.DEFAULT }

export const TableContext = createContext<TableConfig>(defaultTableConfig)
