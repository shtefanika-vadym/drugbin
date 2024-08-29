import { WDS_COLOR_BLUE_400 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { grid } from 'common/styles/mixins/grid.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX } from 'common/styles/size'
import styled, { css } from 'styled-components'
import { TableBreakpoint, TableConfig } from './Table.types'

export const StyledTableHeaderCell = styled.td<{
  cellName?: string
  config?: TableConfig
  breakpoint: TableBreakpoint
  itemGridRows?: string
}>`
  ${textVariant('bodyS')}
  line-height: ${WDS_SIZE_024_PX};
  color: ${WDS_COLOR_BLUE_400};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_024_PX};

  ${({ breakpoint, itemGridRows }) =>
    breakpoint !== TableBreakpoint.DESKTOP
      ? flex({ direction: 'row' })
      : grid({ gridTemplateRows: itemGridRows })}

  ${({ cellName, config }) => css`
    grid-area: ${cellName && config?.headerGridPattern ? cellName : 'auto'};
  `}
`
