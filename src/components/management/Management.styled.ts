import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_040_PX, WDS_SIZE_224_PX } from 'common/styles/size'
import styled from 'styled-components'

export const PaginationContainer = styled.div`
  ${flex({ justifyContent: 'flex-end' })};
  margin-top: ${WDS_SIZE_040_PX};
`

export const TableHeader = styled.thead`
  display: block;
`

export const TableBody = styled.tbody`
  display: block;
`

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`

export const InputWrapper = styled.div`
  width: ${WDS_SIZE_224_PX};
`

export const ExpandIcon = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  cursor: pointer;
`
