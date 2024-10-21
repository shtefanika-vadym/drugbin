import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_004_PX, WDS_SIZE_008_PX, WDS_SIZE_028_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ justifyContent: 'space-around', alignItems: 'center' })};
`

export const DoughnutBackgorund = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: 229px;
  height: 229px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: white;
  filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.04))
    drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.12));
`

export const Line = styled.div<{ color: string }>`
  border-bottom: ${({ color }) => `${WDS_SIZE_004_PX} solid ${color}`};
  border-radius: ${WDS_SIZE_008_PX};
  width: ${WDS_SIZE_028_PX};
`

export const LegendStyles = styled.div`
  ${flex({ alignItems: 'center', gap: '15px' })};
`

export const LegendWrapper = styled.div`
  ${flex({ direction: 'column', gap: '8px' })};
`
