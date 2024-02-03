import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_010_PX, WDS_SIZE_016_PX } from 'common/style/size'
import styled, { keyframes } from 'styled-components'

const progressAnimation = keyframes`
  from {
    width: 0;
  }
`

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })};
`

export const Details = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
`

export const BarWrapper = styled.div`
  width: 100%;
  height: ${WDS_SIZE_016_PX};
  background-color: #ebf0fb;
  border-radius: 10px;
  overflow: hidden;
`

export const Bar = styled.div<{ progress: number; color: string }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ color }) => color};
  border-radius: ${WDS_SIZE_010_PX};
  transition: width 0.3s ease-in-out;
  animation: ${progressAnimation} 1.5s ease-in-out;
`
