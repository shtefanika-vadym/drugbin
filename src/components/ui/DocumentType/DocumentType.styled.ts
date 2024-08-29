import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_016_PX, WDS_SIZE_036_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX})};
`

export const LegendDot = styled.div<{ color: string }>`
  height: ${WDS_SIZE_016_PX};
  width: ${WDS_SIZE_036_PX};
  background-color: ${({ color }) => color};
  border-radius: 100px;
`

export const TextWrapper = styled.div`
  ${flex({ direction: 'column', gap: '4px' })}
`

export const Legend = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX, alignItems: 'center' })}
`
