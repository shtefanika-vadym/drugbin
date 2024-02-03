import { WDS_COLOR_BLUE_100 } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_064_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
`

export const LegendContent = styled.div`
  ${flex({ gap: '30px', alignItems: 'center' })};
`

export const Border = styled.div`
  width: ${WDS_SIZE_064_PX};
  border-bottom: 6px solid ${WDS_COLOR_BLUE_100};
`
