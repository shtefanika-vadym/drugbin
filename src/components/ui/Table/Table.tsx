import { Breakpoints } from 'common/hooks/useBreakpoints'
import { useCallback } from 'react'
import { Container } from './Table.styled'
import { TableBreakpoint, TableConfig, TableConfigProp } from './Table.types'
import { TableContext } from './TableContext'
import { DocumentsSkeleton } from '../DocumentsSkeleton/DocumentsSkeleton'

interface TableProps {
  children: React.ReactNode
  configDesktop: TableConfigProp
  breakpoints: Breakpoints
  isLoading?: boolean
}

const defaultConfig: Omit<{ [key in keyof typeof TableBreakpoint]: TableConfig }, 'DEFAULT'> = {
  MOBILE: {
    breakpoint: TableBreakpoint.MOBILE,
  },
  TABLET: {
    breakpoint: TableBreakpoint.TABLET,
  },
  DESKTOP: {
    breakpoint: TableBreakpoint.DESKTOP,
  },
}

export const Table: React.FC<TableProps> = ({
  children,
  configDesktop,
  breakpoints,
  isLoading,
}) => {
  const getConfig = useCallback<() => TableConfig>(() => {
    if (breakpoints?.isDesktop && configDesktop) {
      return { ...defaultConfig.DESKTOP, ...configDesktop }
    }

    return {
      breakpoint: TableBreakpoint.DEFAULT,
    }
  }, [breakpoints, configDesktop])

  if (isLoading) return <DocumentsSkeleton />

  return (
    <TableContext.Provider value={getConfig()}>
      <Container>{children}</Container>
    </TableContext.Provider>
  )
}
