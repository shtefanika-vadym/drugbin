import { WDS_COLOR_GREY } from 'common/styles/colors'
import { ellipsis } from 'common/styles/mixins/elipsis.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX, WDS_SIZE_104_PX } from 'common/styles/size'
import styled, { css } from 'styled-components'
import { CellVariant } from './Table.types'

export const StyledTableCell = styled.td<{ variant: CellVariant }>`
  ${flex({ direction: 'column', justifyContent: 'center' })}

  ${({ variant }) =>
    variant === CellVariant.ACTION
      ? css`
          padding: ${WDS_SIZE_008_PX} 0 ${WDS_SIZE_008_PX} ${WDS_SIZE_024_PX};
        `
      : css`
          padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_024_PX};
        `}
`

export const Label = styled.div`
  color: ${WDS_COLOR_GREY};
  ${textVariant('bodyS')};
  ${ellipsis({
    maxWidth: WDS_SIZE_104_PX,
    webkitLineClamp: 1,
    whiteSpace: 'nowrap',
  })}
`

export const Value = styled.div`
  ${textVariant('bodyM')};
`

export const EmptyCell = styled.td`
  display: block;
`
