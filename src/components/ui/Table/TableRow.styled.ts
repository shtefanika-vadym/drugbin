import { WDS_COLOR_BLUE_100, WDS_COLOR_GREY } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { grid } from 'common/styles/mixins/grid.mixin'
import styled from 'styled-components'
import { TableConfig } from './Table.types'

export const StyledTableRow = styled.tr<{ config: TableConfig; isOpen?: boolean }>`
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid ${WDS_COLOR_BLUE_100};
    ${({ isOpen }) => isOpen && `border-bottom: unset`}
  }

  ${({ config }) =>
    config.itemGridCols || config.itemGridRows || config.itemGridPattern
      ? grid({
          gridTemplateColumns: config.itemGridCols,
          gridTemplateRows: config.itemGridRows,
          gridTemplateAreas: config.itemGridPattern,
        })
      : flex({ direction: 'row' })}
`

export const TableLoaderRow = styled.tr`
  border-top: 1px solid ${WDS_COLOR_GREY};
  margin: 0;
  display: block;
`

export const TableLoaderCell = styled.td`
  display: block;
`

export const EmptyRow = styled.tr`
  display: block;
`
