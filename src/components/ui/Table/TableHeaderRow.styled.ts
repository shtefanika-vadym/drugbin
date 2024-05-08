import styled from 'styled-components'
import { TableConfig } from './Table.types'
import { grid } from 'common/style/mixins/grid.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_COLOR_BLUE_100 } from 'common/style/colors'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX } from 'common/style/size'

export const StyledTableHeaderRow = styled.tr<{ config: TableConfig }>`
  width: 100%;
  background-color: ${WDS_COLOR_BLUE_100};
  border-radius: ${WDS_SIZE_008_PX};
  margin-bottom: ${WDS_SIZE_024_PX};

  ${({ config }) =>
    config.itemGridCols
      ? grid({
          gridTemplateColumns: config.itemGridCols,
          gridTemplateAreas: config?.headerGridPattern,
        })
      : flex({ direction: 'row' })}
`
