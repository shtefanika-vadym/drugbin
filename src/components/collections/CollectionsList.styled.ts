import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_016_PX, WDS_SIZE_300_PX } from 'common/styles/size'
import styled from 'styled-components'

/** Admin-only filter strip above the collections table. */
export const FilterRow = styled.div`
  ${flex({ alignItems: 'flex-end', gap: WDS_SIZE_016_PX, flexWrap: 'wrap' })};
`

export const FilterBox = styled.div`
  width: ${WDS_SIZE_300_PX};
  max-width: 100%;
`

/** Keeps a wide row grid from pushing the page body sideways at 390px / 1440px. */
export const TableScroll = styled.div`
  overflow-x: auto;
`
