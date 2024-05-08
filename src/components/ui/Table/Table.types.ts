export interface TableConfig {
  breakpoint: TableBreakpoint
  itemGridPattern?: string
  headerGridPattern?: string
  itemGridRows?: string
  itemGridCols?: string
}

export type TableConfigProp = Omit<TableConfig, 'breakpoint'>

export enum TableBreakpoint {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
  DEFAULT = 'default',
}

export enum CellVariant {
  TEXT = 'text',
  NUMERIC = 'numeric',
  ACTION = 'action',
  HEADER = 'header',
}
