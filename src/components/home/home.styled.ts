import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_032_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_032_PX })};
`

export const ChartAlign = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
`

export const BottomChart = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`
