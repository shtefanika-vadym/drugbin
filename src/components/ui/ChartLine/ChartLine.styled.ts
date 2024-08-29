import { WDS_COLOR_BLUE_100 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_064_PX } from 'common/styles/size'
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
