import { WDS_COLOR_BLUE_300, WDS_COLOR_BLUE_500, WDS_COLOR_GREEN, WDS_COLOR_GREY_100 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_004_PX, WDS_SIZE_006_PX, WDS_SIZE_008_PX, WDS_SIZE_016_PX, WDS_SIZE_020_PX } from 'common/styles/size'
import styled from 'styled-components'

export const SEGMENT_COLORS = [WDS_COLOR_BLUE_300, WDS_COLOR_GREEN, '#F2C94C', WDS_COLOR_BLUE_500]

export const Bar = styled.div`
  ${flex({})};
  width: 100%;
  height: ${WDS_SIZE_020_PX};
  border-radius: ${WDS_SIZE_004_PX};
  overflow: hidden;
  background: ${WDS_COLOR_GREY_100};
`

export const Segment = styled.div<{ ratio: number; index: number }>`
  width: ${({ ratio }) => Math.max(ratio * 100, 0)}%;
  background: ${({ index }) => SEGMENT_COLORS[index % SEGMENT_COLORS.length]};
`

export const Legend = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX, flexWrap: 'wrap' })};
  margin-top: ${WDS_SIZE_008_PX};

  span {
    ${flex({ alignItems: 'center', gap: WDS_SIZE_006_PX })};
  }
`

export const Swatch = styled.i<{ index: number }>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: ${({ index }) => SEGMENT_COLORS[index % SEGMENT_COLORS.length]};
`

export const Total = styled.div`
  margin-top: ${WDS_SIZE_004_PX};
`
