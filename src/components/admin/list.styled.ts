import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_012_PX, WDS_SIZE_016_PX, WDS_SIZE_024_PX, WDS_SIZE_040_PX, WDS_SIZE_300_PX } from 'common/styles/size'
import styled from 'styled-components'

/** Shared layout for the admin list screens, matching src/components/management/Management.styled. */

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`

export const HeaderRow = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between', gap: WDS_SIZE_016_PX, flexWrap: 'wrap' })};
`

export const HeaderActions = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
`

export const InputWrapper = styled.div`
  width: ${WDS_SIZE_300_PX};
  max-width: 100%;
`

export const Filters = styled.div`
  ${flex({ alignItems: 'flex-end', gap: WDS_SIZE_016_PX, flexWrap: 'wrap' })};
`

export const FilterBox = styled.div`
  width: ${WDS_SIZE_300_PX};
  max-width: 100%;
`

export const TableHeader = styled.thead`
  display: block;
`

export const TableBody = styled.tbody`
  display: block;
`

export const MoreRow = styled.div`
  ${flex({ justifyContent: 'center' })};
  margin-top: ${WDS_SIZE_040_PX};
`

export const PaginationRow = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between', gap: WDS_SIZE_016_PX, flexWrap: 'wrap' })};
`

export const PaginationMeta = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
`

export const PageSizeBox = styled.div`
  width: 140px;
`
