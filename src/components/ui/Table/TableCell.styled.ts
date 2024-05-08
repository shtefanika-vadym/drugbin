import { WDS_COLOR_GREY } from 'common/style/colors'
import { textClamp } from 'common/style/mixins/textClamp.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX } from 'common/style/size'
import styled, { css } from 'styled-components'
import { CellVariant } from './Table.types'
import { flex } from 'common/style/mixins/flex.mixin'

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
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_GREY};
  ${textClamp(1, true)};
  max-width: 147px;
`

export const Value = styled.div`
  ${textVariant('bodyM')};
`

export const EmptyCell = styled.td`
  display: block;
`
